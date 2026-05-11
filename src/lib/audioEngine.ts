export type ChannelId = 'rain' | 'wind' | 'fire' | 'stream' | 'birds'

export interface AudioExtension {
  name: string
  generateTrack?: (channelId: ChannelId) => Promise<AudioBuffer | null>
}

export class AudioEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private channelGains = new Map<ChannelId, GainNode>()
  private activeChannels = new Set<ChannelId>()
  private crackleTimer: ReturnType<typeof setTimeout> | null = null
  private birdTimer: ReturnType<typeof setTimeout> | null = null
  private extension: AudioExtension | null = null
  private _volume = 0.6
  private channelBuffers = new Map<ChannelId, AudioBuffer>()
  private bufferSources = new Map<ChannelId, AudioBufferSourceNode>()

  get volume() { return this._volume }

  init() {
    if (!this.ctx) {
      this.ctx = new AudioContext()
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.value = this._volume
      this.masterGain.connect(this.ctx.destination)
    }
    if (this.ctx.state === 'suspended') this.ctx.resume()
  }

  setExtension(ext: AudioExtension) { this.extension = ext }

  isActive(channel: ChannelId): boolean { return this.activeChannels.has(channel) }

  toggleChannel(channel: ChannelId, active: boolean) {
    if (!this.ctx || !this.masterGain) return
    if (active && !this.activeChannels.has(channel)) this.startChannel(channel)
    else if (!active && this.activeChannels.has(channel)) this.stopChannel(channel)
  }

  async loadAudioBuffer(channel: ChannelId, url: string): Promise<void> {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const arrayBuf = await res.arrayBuffer()
      if (!this.ctx) this.init()
      const audioBuf = await this.ctx!.decodeAudioData(arrayBuf)
      this.channelBuffers.set(channel, audioBuf)
    } catch (e) {
      console.warn(`[AudioEngine] failed to load ${url}:`, e)
    }
  }

  private startChannel(channel: ChannelId) {
    if (!this.ctx || !this.masterGain) return
    const gainNode = this.ctx.createGain()
    gainNode.gain.value = 0
    gainNode.connect(this.masterGain)
    this.channelGains.set(channel, gainNode)

    this.createSoundSources(channel, gainNode)
    this.activeChannels.add(channel)

    const now = this.ctx.currentTime
    gainNode.gain.linearRampToValueAtTime(1, now + 2)
  }

  private stopChannel(channel: ChannelId) {
    if (!this.ctx) return
    const gainNode = this.channelGains.get(channel)
    if (gainNode) {
      const now = this.ctx.currentTime
      gainNode.gain.linearRampToValueAtTime(0, now + 2)
      setTimeout(() => {
        gainNode.disconnect()
        this.channelGains.delete(channel)
      }, 2100)
    }
    this.stopBufferSource(channel)
    if (channel === 'fire') this.stopCrackles()
    if (channel === 'birds') this.stopBirdChirps()
    this.activeChannels.delete(channel)
  }

  private stopBufferSource(channel: ChannelId) {
    const src = this.bufferSources.get(channel)
    if (src) {
      try { src.stop() } catch {}
      src.disconnect()
      this.bufferSources.delete(channel)
    }
  }

  private createSoundSources(channel: ChannelId, output: GainNode) {
    if (!this.ctx) return
    switch (channel) {
      case 'rain': this.createRain(output); break
      case 'wind': this.createWind(output); break
      case 'fire': this.createFire(output); break
      case 'stream': this.createStream(output); break
      case 'birds': this.createBirds(output); break
    }
  }

  private createRain(output: AudioNode) {
    if (!this.ctx) return
    this.createNoiseLayer(output, { type: 'bandpass', freq: 200, Q: 0.3, gain: 0.18 })
    this.createNoiseLayer(output, { type: 'bandpass', freq: 1200, Q: 0.4, gain: 0.4 })
    this.createNoiseLayer(output, { type: 'bandpass', freq: 3500, Q: 0.7, gain: 0.3 })
    this.createNoiseLayer(output, { type: 'highpass', freq: 7000, Q: 1, gain: 0.2 })
    const glide = this.ctx.createOscillator()
    glide.frequency.value = 0.12
    const glideGain = this.ctx.createGain()
    glideGain.gain.value = 0.06
    const glideFilter = this.ctx.createBiquadFilter()
    glideFilter.type = 'bandpass'
    glideFilter.frequency.value = 1200
    glideFilter.Q.value = 2
    glide.connect(glideGain)
    glideGain.connect(glideFilter.frequency)
    glideFilter.connect(output)
    glide.start()
  }

  private createWind(output: AudioNode) {
    if (!this.ctx) return
    const src = this.createNoiseSource()
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 350

    const gain = this.ctx.createGain()
    gain.gain.value = 0.35

    const lfo = this.ctx.createOscillator()
    lfo.frequency.value = 0.08
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.value = 0.15

    lfo.connect(lfoGain)
    lfoGain.connect(gain.gain)
    lfo.start()

    src.connect(filter)
    filter.connect(gain)
    gain.connect(output)
  }

  private createFire(output: AudioNode) {
    if (!this.ctx) return
    const src = this.createNoiseSource()
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 120
    const gain = this.ctx.createGain()
    gain.gain.value = 0.5
    const lfo = this.ctx.createOscillator()
    lfo.frequency.value = 0.25
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.value = 0.15
    lfo.connect(lfoGain)
    lfoGain.connect(gain.gain)
    lfo.start()

    this.createNoiseLayer(output, { type: 'bandpass', freq: 700, Q: 0.5, gain: 0.2 })

    src.connect(filter)
    filter.connect(gain)
    gain.connect(output)
    this.startCrackles(output)
  }

  private createStream(output: AudioNode) {
    if (!this.ctx) return
    const src = this.createNoiseSource()
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 800
    filter.Q.value = 0.5

    const gain = this.ctx.createGain()
    gain.gain.value = 0.3

    const lfo = this.ctx.createOscillator()
    lfo.frequency.value = 0.05
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.value = 0.12

    lfo.connect(lfoGain)
    lfoGain.connect(gain.gain)
    lfo.start()

    src.connect(filter)
    filter.connect(gain)
    gain.connect(output)
  }

  private createBirds(output: AudioNode) {
    if (!this.ctx) return

    const buf = this.channelBuffers.get('birds')
    if (buf) {
      const src = this.ctx.createBufferSource()
      src.buffer = buf
      src.loop = true
      const gain = this.ctx.createGain()
      gain.gain.value = 0.5
      src.connect(gain)
      gain.connect(output)
      src.start()
      this.bufferSources.set('birds', src)
      return
    }

    const src = this.createNoiseSource()
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 3000

    const gain = this.ctx.createGain()
    gain.gain.value = 0.08

    const lfo = this.ctx.createOscillator()
    lfo.frequency.value = 4
    const lfoGain = this.ctx.createGain()
    lfoGain.gain.value = 0.06
    lfo.connect(lfoGain)
    lfoGain.connect(gain.gain)
    lfo.start()

    src.connect(filter)
    filter.connect(gain)
    gain.connect(output)

    this.startBirdChirps(output)
  }

  private createNoiseSource() {
    if (!this.ctx) throw new Error('AudioContext not initialized')
    const sr = this.ctx.sampleRate
    const len = sr * 4
    const buf = this.ctx.createBuffer(1, len, sr)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
    const src = this.ctx.createBufferSource()
    src.buffer = buf
    src.loop = true
    src.start()
    return src
  }

  private createNoiseLayer(output: AudioNode, cfg: { type: BiquadFilterType; freq: number; Q: number; gain: number }) {
    if (!this.ctx) return
    const src = this.createNoiseSource()
    const filter = this.ctx.createBiquadFilter()
    filter.type = cfg.type
    filter.frequency.value = cfg.freq
    filter.Q.value = cfg.Q
    const gain = this.ctx.createGain()
    gain.gain.value = cfg.gain
    src.connect(filter)
    filter.connect(gain)
    gain.connect(output)
  }

  private startCrackles(output: AudioNode) {
    const tick = () => {
      if (!this.ctx || !this.activeChannels.has('fire')) return
      this.playCrackle(output)
      this.crackleTimer = setTimeout(tick, 150 + Math.random() * 600)
    }
    tick()
  }

  private playCrackle(output: AudioNode) {
    if (!this.ctx) return
    const dur = 0.04 + Math.random() * 0.08
    const sr = this.ctx.sampleRate
    const len = Math.floor(sr * dur)
    const buf = this.ctx.createBuffer(1, len, sr)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.25))
    }
    const src = this.ctx.createBufferSource()
    src.buffer = buf
    const filter = this.ctx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 2500
    const gain = this.ctx.createGain()
    gain.gain.value = 0.2 + Math.random() * 0.25
    src.connect(filter)
    filter.connect(gain)
    gain.connect(output)
    src.start()
  }

  private stopCrackles() {
    if (this.crackleTimer) {
      clearTimeout(this.crackleTimer)
      this.crackleTimer = null
    }
  }

  private startBirdChirps(output: AudioNode) {
    const chirp = () => {
      if (!this.ctx || !this.activeChannels.has('birds')) return
      this.playBirdChirp(output)
      this.birdTimer = setTimeout(chirp, 2000 + Math.random() * 4000)
    }
    chirp()
  }

  private playBirdChirp(output: AudioNode) {
    if (!this.ctx) return
    const dur = 0.08 + Math.random() * 0.12
    const sr = this.ctx.sampleRate
    const len = Math.floor(sr * dur)
    const buf = this.ctx.createBuffer(1, len, sr)
    const d = buf.getChannelData(0)
    for (let i = 0; i < len; i++) {
      const t = i / sr
      d[i] = Math.sin(2 * Math.PI * (2000 + Math.random() * 1500) * t) * Math.exp(-t * 12)
    }
    const src = this.ctx.createBufferSource()
    src.buffer = buf
    const gain = this.ctx.createGain()
    gain.gain.value = 0.15 + Math.random() * 0.2
    src.connect(gain)
    gain.connect(output)
    src.start()
  }

  private stopBirdChirps() {
    if (this.birdTimer) {
      clearTimeout(this.birdTimer)
      this.birdTimer = null
    }
  }

  setMasterVolume(value: number) {
    this._volume = value
    if (this.masterGain) {
      const t = this.ctx?.currentTime ?? 0
      this.masterGain.gain.linearRampToValueAtTime(value, t + 0.1)
    }
  }

  startAmbient() {
    this.init()
    if (!this.activeChannels.has('rain')) {
      this.toggleChannel('rain', true)
    }
  }

  destroy() {
    this.stopCrackles()
    this.stopBirdChirps()
    this.bufferSources.forEach((src) => {
      try { src.stop() } catch {}
      src.disconnect()
    })
    this.bufferSources.clear()
    this.activeChannels.clear()
    this.channelGains.forEach(g => g.disconnect())
    this.channelGains.clear()
    if (this.masterGain) this.masterGain.disconnect()
    if (this.ctx) this.ctx.close()
    this.ctx = null
    this.masterGain = null
  }
}

export const audioEngine = new AudioEngine()
