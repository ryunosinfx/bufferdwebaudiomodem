/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// UNUSED EXPORTS: WebAudioModem, WebAudioModemView

;// CONCATENATED MODULE: ./util/V.js
class V {
  static c(tagName) {
    return V.d.createElement(tagName);
  }

  static a(elm, child) {
    return elm.appendChild(child);
  }

  static q(selector) {
    return V.d.querySelector(selector);
  }

  static gid(id) {
    return V.d.getElementById(id);
  }

  static ga(elm, attrName) {
    return elm.getAttribute(attrName);
  }

  static sa(elm, attrName, value) {
    return elm.setAttribute(attrName, value);
  }

  static qa(selector) {
    return V.d.querySelectorAll(selector);
  }

  static ael(elm, eventName, func) {
    const elemnt = typeof elm === 'string' ? V.gid(elm) : elm;
    elemnt.addEventListener(eventName, func);
  }

  static init() {
    // config behaviour
    for (let input of V.qa('input')) {
      const label = V.q(`label[for="${V.ga(input, 'id')}"] [data-val]`);
      label.textContent = input.value;
      V.ael(input, 'change', e => {
        label.textContent = e.target.value;
      });
    }
  }

  static fireEvent(elm, eventType) {
    if (!elm) {
      return;
    } // Thanks to https://stackoverflow.com/a/2706236


    if (elm.fireEvent) {
      elm.fireEvent('on' + eventType);
    } else {
      const evObj = V.d.createEvent('Events');
      evObj.initEvent(eventType, true, false);
      elm.dispatchEvent(evObj);
    }
  }

}
V.d = document;
V.b = document.body;
;// CONCATENATED MODULE: ./node_modules/b64util.es/b64util.js
const max = 50000;
const RB64Regex = /^[0-9a-zA-Z/\+]+[=]{0,3}$/;
const RB64UrlRegex = /^[-_0-9a-zA-Z]+$/;
const b64util_td = new TextDecoder('utf-8');
const te = new TextEncoder();
class B64Util {
  static from64u(u) {
    return B64Util.from64(B64Util.toB64(u));
  }

  static from64(d) {
    return B64Util.u8aToUtf8(B64Util.b64ToU8a(d));
  }

  static to64u(s) {
    return B64Util.toB64u(B64Util.to64(s));
  }

  static to64(s) {
    const len = s.length;
    const pageNum = Math.ceil(len / max);
    const results = [];

    for (let j = 0; j < pageNum; j++) {
      const start = max * j;
      const size = len - start;
      const p = size > max ? max : size > 0 ? size : len;
      const end = start + p;
      const input = s.substring(start, end);
      const ab = te.encode(input);
      const c = String.fromCharCode(...new Uint8Array(ab));
      results.push(c);
    }

    return btoa(results.join(''));
  }

  static b64ToU8a(d) {
    const a = atob(d);
    const b = new Uint8Array(a.length);

    for (let i = 0; i < b.length; i++) {
      try {
        b[i] = a.charCodeAt(i);
      } catch (e) {
        console.log(i);
        console.log(e);
      }
    }

    return b;
  }

  static u8a2b64(u8a) {
    const bs = u8a ? B64Util.u8a2bs(u8a) : null;
    return bs ? btoa(bs) : null;
  }

  static u8a2Hex(u8a) {
    const d = u8a ? B64Util.u8a2b64(u8a) : null;
    return d ? B64Util.b64toHex(d) : null;
  }

  static s2u8a(s) {
    const d = B64Util.to64(s);
    return B64Util.b64ToU8a(d);
  }

  static s2hex(s) {
    const d = B64Util.to64(s);
    const hex = B64Util.b64toHex(d);
    return hex;
  }

  static hex2s(hex) {
    const u8a = B64Util.hex2u8a(hex);
    const d = B64Util.aToB64(u8a.buffer);
    return B64Util.from64(d);
  }

  static b64uToAb(b) {
    const d = B64Util.toB64(b);
    return B64Util.b64ToU8a(d).buffer;
  }

  static b64Tobs(d) {
    return B64Util.u8a2bs(B64Util.b64ToU8a(d));
  }

  static b64u2bs(d) {
    return B64Util.u8a2bs(B64Util.b64ToU8a(d));
  }

  static u8a2bs(u8a) {
    const r = [];

    for (let e of u8a) {
      r.push(String.fromCharCode(e));
    }

    return r.join('');
  }

  static hex2u8a(hex) {
    return new Uint8Array(hex.match(/[0-9a-f]{2}/gi).map(h => {
      return parseInt(h, 16);
    }));
  }

  static hex2b64(hex) {
    return B64Util.u8a2b64(B64Util.hex2u8a(hex));
  }

  static hex2bs(hex) {
    return B64Util.u8a2bs(B64Util.hex2u8a(hex));
  }

  static ab2bs(ab) {
    return B64Util.u8a2bs(new Uint8Array(ab));
  }

  static aToB64(ai) {
    const ab = ai.buffer ? ai.buffer : ai;
    return btoa(B64Util.ab2bs(ab));
  }

  static aToB64u(ai) {
    const b = B64Util.aToB64(ai);
    return B64Util.toB64u(b);
  }

  static b64toHex(b64) {
    const u8a = B64Util.b64ToU8a(b64);
    return B64Util.aToHex(u8a);
  }

  static aToHex(ai) {
    const u8a = ai.buffer ? new Uint8Array(ai.buffer) : new Uint8Array(ai);
    const rl = [];

    for (let i of u8a) {
      const a = i.toString(16);
      rl.push(('00' + a).slice(-2));
    }

    return rl.join('');
  }

  static bs2u8a(bs) {
    const l = bs.length;
    const a = new Uint8Array(new ArrayBuffer(l));

    for (let i = 0; i < l; i++) {
      a[i] = bs.charCodeAt(i);
    }

    return a;
  }

  static isB64(d) {
    return d && typeof d === 'string' && d.length % 4 === 0 && RB64Regex.test(d);
  }

  static isB64u(d) {
    return d && typeof d === 'string' && d.length % 4 === 0 && RB64Regex.test(d);
  }

  static u8aToUtf8(u8a) {
    return b64util_td.decode(u8a.buffer);
  }

  static bs2utf8(bs) {
    const u8a = B64Util.bs2u8a(bs);
    return b64util_td.decode(u8a.buffer);
  }

  static dataURI2bs(dURI) {
    return atob(dURI.split(',')[1]);
  }

  static dataURI2u8a(dURI) {
    return B64Util.bs2u8a(atob(dURI.split(',')[1]));
  }

  static ab2dataURI(ab, type = 'application/octet-stream') {
    const b = btoa(B64Util.ab2bs(ab));
    return 'data:' + type + ';base64,' + b;
  }

  static b64ToBlob(d, type) {
    const u8a = B64Util.b64ToU8a(d);
    return new Blob([u8a.buffer], {
      type
    });
  }

  static joinU8as(u8as) {
    let l = 0;

    for (let u8a of u8as) {
      l += u8a.length;
    }

    const r = new Uint8Array(l);
    let s = 0;

    for (let u8a of u8as) {
      r.set(u8a, s);
      s += u8a.length;
    }

    return r;
  }

  static toB64u(b) {
    return b ? b.split('+').join('-').split('/').join('_').split('=').join('') : b;
  }

  static toB64(b64u) {
    const l = b64u.length;
    const c = l % 4 > 0 ? 4 - l % 4 : 0;
    let b = b64u.split('-').join('+').split('_').join('/');

    for (let i = 0; i < c; i++) {
      b += '=';
    }

    return b;
  }

  static async sigs(s) {
    return Hasher.sha256(B64Util.s2u8a(s), 1, 'hex');
  }

  static async sig(u8a) {
    return Hasher.sha256(u8a, 1, 'hex');
  }

}
class Hasher {
  static async sha256(m, sc = 1, type = 'base64') {
    return await Hasher.d(m, 'SHA-256', sc, type);
  }

  static async sha384(m, sc = 1, type = 'base64') {
    return await Hasher.d(m, 'SHA-384', sc, type);
  }

  static async sha512(m, sc = 1, type = 'base64') {
    return await Hasher.d(m, 'SHA-512', sc, type);
  }

  static async sha1(m, sc = 1, type = 'base64') {
    return await Hasher.d(m, 'SHA-1', sc, type);
  }

  static async d(m, a = 'SHA-256', sc = 1, type) {
    let r = m.byteLength ? m : m.buffer ? m.buffer : te.encode(m);

    for (let i = 0; i < sc; i++) {
      r = await window.crypto.subtle.digest(a, r);
    }

    return type === 'base64' ? B64Util.aToB64(r) : type === 'base64url' ? B64Util.aToB64u(r) : B64Util.aToHex(r);
  }

}
;// CONCATENATED MODULE: ./node_modules/webaudio-modem/util/B64Util.js
const B64Util_max = 50000;
const B64Util_RB64Regex = /^[0-9a-zA-Z/\+]+[=]{0,3}$/;
class B64Util_B64Util {
  static from64(d) {
    const a = new Uint8Array(1);
    a.fill(0);
    const b = B64Util_B64Util.b64ToU8a(d);
    const u8a = b.length % 2 ? B64Util_B64Util.joinU8as([b, a]) : b;
    const u16a = new Uint16Array(u8a.buffer);
    const l = u16a.length;
    const c = Math.ceil(l / B64Util_max);
    const r = [];

    for (let j = 0; j < c; j++) {
      const start = B64Util_max * j;
      const size = l - start;
      const p = size > B64Util_max ? B64Util_max : size > 0 ? size : l;
      const u = u16a.slice(start, start + p);
      r.push(String.fromCharCode(...u));
    }

    return r.join('');
  }

  static to64(s) {
    const len = s.length;
    const pageNum = Math.ceil(len / B64Util_max);
    const results = [];

    for (let j = 0; j < pageNum; j++) {
      const start = B64Util_max * j;
      const size = len - start;
      const p = size > B64Util_max ? B64Util_max : size > 0 ? size : len;
      const end = start + p;
      const input = s.substring(start, end);
      const u = new Uint16Array(p);

      for (let i = 0; i < p; i++) {
        u[i] = input.charCodeAt(i);
      }

      const c = String.fromCharCode(...new Uint8Array(u.buffer));
      results.push(c);
    }

    return btoa(results.join(''));
  }

  static b64ToU8a(d) {
    const a = atob(d);
    const b = new Uint8Array(a.length);

    for (let i = 0; i < b.length; i++) {
      try {
        b[i] = a.charCodeAt(i);
      } catch (e) {
        console.log(i);
        console.log(e);
      }
    }

    return b;
  }

  static u8a2b64(u8a) {
    const bs = u8a ? B64Util_B64Util.u8a2bs(u8a) : null;
    return bs ? btoa(bs) : null;
  }

  static s2u8a(s) {
    const d = B64Util_B64Util.to64(s);
    return B64Util_B64Util.b64ToU8a(d);
  }

  static s2hex(s) {
    const d = B64Util_B64Util.to64(s);
    const hex = B64Util_B64Util.b64toHex(d);
    return hex;
  }

  static u8a2hex(u8a) {
    return B64Util_B64Util.aToHex(u8a);
  }

  static hex2s(hex) {
    const u8a = B64Util_B64Util.hex2u8a(hex);
    const d = B64Util_B64Util.aToB64(u8a.buffer);
    return B64Util_B64Util.from64(d);
  }

  static b64uToAb(b) {
    const d = B64Util_B64Util.toB64(b);
    return B64Util_B64Util.b64ToU8a(d).buffer;
  }

  static u8a2bs(u8a) {
    const r = [];

    for (let e of u8a) {
      r.push(String.fromCharCode(e));
    }

    return r.join('');
  }

  static hex2u8a(hex) {
    return new Uint8Array(hex.match(/[0-9a-f]{2}/gi).map(h => {
      return parseInt(h, 16);
    }));
  }

  static ab2bs(ab) {
    return B64Util_B64Util.u8a2bs(new Uint8Array(ab));
  }

  static aToB64(ai) {
    const ab = ai.buffer ? ai.buffer : ai;
    return btoa(B64Util_B64Util.ab2bs(ab));
  }

  static aToB64u(ai) {
    const b = B64Util_B64Util.aToB64(ai);
    return B64Util_B64Util.toB64u(b);
  }

  static b64toHex(b64) {
    const u8a = B64Util_B64Util.b64ToU8a(b64);
    return B64Util_B64Util.aToHex(u8a);
  }

  static aToHex(ai) {
    const u8a = ai.buffer ? new Uint8Array(ai.buffer) : new Uint8Array(ai);
    const rl = [];

    for (let i of u8a) {
      const a = i.toString(16);
      rl.push(('00' + a).slice(-2));
    }

    return rl.join('');
  }

  static bs2u8a(bs) {
    const l = bs.length;
    const a = new Uint8Array(new ArrayBuffer(l));

    for (let i = 0; i < l; i++) {
      a[i] = bs.charCodeAt(i);
    }

    return a;
  }

  static isB64(d) {
    return d && typeof d === 'string' && d.length % 4 === 0 && B64Util_RB64Regex.test(d);
  }

  static bs2utf8(bs) {
    const u8a = B64Util_B64Util.bs2u8a(bs);
    return td.decode(u8a.buffer);
  }

  static dataURI2bs(dURI) {
    return atob(dURI.split(',')[1]);
  }

  static dataURI2u8a(dURI) {
    return B64Util_B64Util.bs2u8a(atob(dURI.split(',')[1]));
  }

  static ab2dataURI(ab, type = 'application/octet-stream') {
    const b = btoa(B64Util_B64Util.ab2bs(ab));
    return 'data:' + type + ';base64,' + b;
  }

  static joinU8as(u8as) {
    let l = 0;

    for (let u8a of u8as) {
      l += u8a.length;
    }

    const r = new Uint8Array(l);
    let s = 0;

    for (let u8a of u8as) {
      r.set(u8a, s);
      s += u8a.length;
    }

    return r;
  }

  static toB64u(b) {
    return b ? b.split('+').join('-').split('/').join('_').split('=').join('') : b;
  }

  static toB64(b64u) {
    const l = b64u.length;
    const c = l % 4 > 0 ? 4 - l % 4 : 0;
    let b = b64u.split('-').join('+').split('_').join('/');

    for (let i = 0; i < c; i++) {
      b += '=';
    }

    return b;
  }

}
;// CONCATENATED MODULE: ./node_modules/webaudio-modem/util/ProcessUtil.js
class ProcessUtil {
  static sleep(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

}
;// CONCATENATED MODULE: ./node_modules/webaudio-modem/WebAudioModemBufferedCore.js


const subCount = 7;
const harf = Math.floor(subCount / 2);

class BaseSetting {
  static getAudioContext() {
    return window.webkitAudioContext ? new webkitAudioContext() : new AudioContext(); // return BaseSetting.audioContext;
  }

}

BaseSetting.frequenciesb = [392, 784, 1046.5, 1318.5, 1568, 1864.7, 2093, 2637];
BaseSetting.frequencies = [697, 770, 852, 941, 1209, 1336, 1477, 1633];
BaseSetting.audioContext = window.webkitAudioContext ? new webkitAudioContext() : new AudioContext();
BaseSetting.pad = '0b00000000';
class Oscillator {
  constructor(frequencies = BaseSetting.frequencies, alertMsg = 'click widow somewehere!.') {
    this.frequencies = frequencies;
    this.frequenciesLen = frequencies.length;
    this.inited = false;
    this.alertMsg = alertMsg;
    window.addEventListener('click', e => {
      this.init();
    });
    this.progress = 0;

    this.onProgress = progress => {};
  }

  async init() {
    if (this.inited) {
      return;
    }

    this.audioContext = BaseSetting.getAudioContext();
    const masterGain = this.audioContext.createGain();
    masterGain.gain.value = 1.0 / this.frequencies.length;
    const sinusoids = [];
    const oscillators = [];

    for (const frequency of this.frequencies) {
      const sine = this.audioContext.createOscillator();
      sine.type = 'square'; //square sine

      sine.frequency.value = frequency;
      sine.start();
      sinusoids.push(sine);
      const volume = this.audioContext.createGain();
      volume.gain.value = 0;
      oscillators.push(volume);
      sine.connect(volume);
      volume.connect(masterGain);
    } // connect nodes


    masterGain.connect(this.audioContext.destination);
    this.oscillators = oscillators;
    this.inited = true;
  }

  mute() {
    for (const osc of this.oscillators) {
      osc.gain.value = 0;
    }
  }

  async encodeCharcode(charCode, duration) {
    if (!this.oscillators) {
      alert(this.alertMsg);
      return;
    }

    for (let i = 0; i < this.frequenciesLen; i++) {
      const osc = this.oscillators[i];
      osc.gain.value = charCode & 1 << i ? 1 : 0;
    }

    await ProcessUtil.sleep(duration);
  }
  /**
   *
   * @param {string/Uint8Array} text
   */


  convertTextToHaming(text) {
    const result = [];
    const hex = typeof text === 'string' ? B64Util_B64Util.s2hex(text) : B64Util_B64Util.u8a2hex(text);
    console.log('hex:' + hex + '/' + hex.length);
    let idx = 0;

    for (const char of hex) {
      idx++;
      const bits = ('0000' + parseInt(char, 16).toString(2)).slice(-4).split('');
      const b1 = bits[0] * 1;
      const b2 = bits[1] * 1;
      const b3 = bits[2] * 1;
      const b4 = bits[3] * 1;
      const c1 = (b1 + b2 + b3) % 2;
      const c2 = (b1 + b3 + b4) % 2;
      const c3 = (b2 + b3 + b4) % 2;
      const i = (b1 + b2 + b3 + b4 + c1 + c2 + c3) % 2;
      const p = i * 1 ? 0 : 1;
      const byte = '' + p + b1 + b2 + b3 + b4 + c1 + c2 + c3;
      result.push(parseInt(byte, 2));
    }

    return result;
  }

  async encode(text, onComplete, onCompleteMute, hasMuteTimeOnEnd) {
    this.init();
    return await this.encodeExec(text, onComplete, onCompleteMute, hasMuteTimeOnEnd);
  }

  async encodeExec(text, onComplete = () => {}, onCompleteMute = () => {}, hasMuteTimeOnEnd = true) {
    this.progress = 0;
    const pause = this.pauseDuration;
    const duration = this.activeDuration;
    const timeBetweenChars = (pause + duration) * 1;
    const hamings = this.convertTextToHaming(text);
    const hamingsLen = hamings.length;
    await this.encodeCharcode(255, duration * 2);
    const start = Date.now();
    let currentDuration = timeBetweenChars;
    const dd = timeBetweenChars * 2;
    const offset = start % timeBetweenChars;
    const times = Math.floor(start / timeBetweenChars);

    for (let i = 0; i < hamingsLen; i++) {
      const target = (times + i) * timeBetweenChars + offset;

      if (pause) {
        await ProcessUtil.sleep(pause * 1);
      }

      await this.encodeCharcode(hamings[i], currentDuration);
      this.progress = (i + 1) / hamingsLen;
      this.onProgressExec();
      const now = Date.now();
      currentDuration = dd - (now - target);
    }

    onCompleteMute();
    this.mute();

    if (hasMuteTimeOnEnd) {
      await ProcessUtil.sleep(timeBetweenChars * hamingsLen);
    }

    this.progress = 1;
    onComplete();
  }

  onProgressExec() {
    setTimeout(() => {
      this.onProgress(this.progress);
    });
  }

  getProgress() {
    return this.progress;
  }

  end() {
    this.progress = 0;
  }

}
class Reciver {
  constructor(frequencies = BaseSetting.frequencies, fftSize = 4096, smoothingTimeConstant = 0.0, minDecibels = -68, alertMsg = 'click widow somewehere!.') {
    this.frequencies = frequencies; // create audio nodes

    this.fftSize = fftSize;
    this.smoothingTimeConstant = smoothingTimeConstant;
    this.minDecibels = minDecibels; // buffer for analyser output

    this.history = [];
    this.inited = false;
    this.alertMsg = alertMsg;
    this.unsherpMaskGain = 1;

    this.onStateChange = () => {};

    window.addEventListener('click', e => {
      this.init();
    });
  }

  async init() {
    if (this.inited) {
      return;
    }

    this.inited = true; // connect nodes

    this.audioContext = BaseSetting.getAudioContext();
    const analyser = this.audioContext.createAnalyser();
    analyser.fftSize = this.fftSize;
    analyser.smoothingTimeConstant = this.smoothingTimeConstant;
    analyser.minDecibels = this.minDecibels;
    this.analyser = analyser;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      const microphone = this.audioContext.createMediaStreamSource(stream);
      console.log(this.analyser);
      microphone.connect(this.analyser);
      this.decode();
    } catch (err) {
      alert('Microphone is required.');
    }

    this.outputType = 'text';
    this.isStop = true;
  }

  setBinVlueThreshold(threshold) {
    this.binVlueThreshold = threshold * 1;
  }

  setSpanDuration(spanDuration) {
    this.spanDuration = spanDuration * 1;
  }

  setUnsherpMaskGain(unsherpMaskGain) {
    this.unsherpMaskGain = unsherpMaskGain * 1;
  }

  setOutputType(outputType = 'text') {
    this.outputType = outputType;
  }

  output(chars) {
    // console.log(chars);
    if (!chars) {
      this.onOutput('');
      return;
    }

    const hex = chars.join('');

    if (!hex) {
      this.onOutput('');
      return;
    } // console.log('output hex');


    const text = this.outputType === 'text' ? B64Util_B64Util.hex2s(hex) : B64Util_B64Util.hex2u8a(hex);
    this.onOutput(text);
  }

  stop() {
    this.isStop = true;
    this.onStateChange(Reciver.state.STOP);
  }

  start() {
    this.init();

    if (this.isStop) {
      this.isStop = false;
      setTimeout(() => {
        console.log('start decoder');
        this.decode();
      }, 1000);
    }
  }

  calcTargetIndexes() {
    const targetIndexes = [];
    const hzPerBin = this.audioContext.sampleRate / (2 * this.analyser.frequencyBinCount);

    for (const f of this.frequencies) {
      const index = Math.floor((f + hzPerBin / 2) / hzPerBin);
      targetIndexes.push(index);
    }

    return targetIndexes;
  }

  valitadeHaming(charCode) {
    const bits = ('00000000' + charCode.toString(2)).slice(-8).split('');
    const i = bits[0];
    const b1 = bits[1] * 1;
    const b2 = bits[2] * 1;
    const b3 = bits[3] * 1;
    const b4 = bits[4] * 1;
    const c1 = bits[5] * 1;
    const c2 = bits[6] * 1;
    const c3 = bits[7] * 1;
    const s1 = (b1 + b2 + b3 + c1) % 2;
    const s2 = (b1 + b3 + b4 + c2) % 2;
    const s3 = (b2 + b3 + b4 + c3) % 2;
    const p = (b1 + b2 + b3 + b4 + c1 + c2 + c3) % 2;
    let hex = '';
    let bit = '';
    let isFailed = false;
    const codn = s1 * 1 + s2 * 2 + s3 * 4;
    const isValid = p * 1 === (i * 1 ? 0 : 1);
    const codnSuccess = codn * 1 === 0;

    if (codnSuccess && isValid) {
      bit = '' + b1 + b2 + b3 + b4;
      isFailed = 0;
    } else if (!codnSuccess && !isValid) {
      if (codn === 3) {
        const a = b1 ? 0 : 1;
        bit = '' + a + b2 + b3 + b4;
      } else if (codn === 5) {
        const a = b2 ? 0 : 1;
        bit = '' + b1 + a + b3 + b4;
      } else if (codn === 7) {
        const a = b3 ? 0 : 1;
        bit = '' + b1 + b2 + a + b4;
      } else if (codn === 6) {
        const a = b4 ? 0 : 1;
        bit = '' + b1 + b2 + b3 + a;
      } else {
        bit = '' + b1 + b2 + b3 + b4;
      }

      isFailed = 0;
    } else {
      isFailed = 1;
      bit = '' + b1 + b2 + b3 + b4;
    }

    hex = parseInt(bit, 2).toString(16);
    return {
      i,
      hex,
      isFailed,
      bit,
      p,
      codn
    };
  }

  parse(bufferedData, indexCount, targetIndexCount, unsherpMaskGain = 1) {
    return new Promise(resolve => {
      console.log('parse A');
      console.time('parse');
      const result = this.parseExec(bufferedData, indexCount, targetIndexCount, unsherpMaskGain);
      console.timeEnd('parse');
      resolve(result);
    });
  }

  parsecharContinuous(part, thresholds, targetIndexCount) {
    const charContinuous = [];
    let lastChar = null;
    const bytes = [];

    for (const calced of part) {
      const data = calced.data; // const time = calced.time;
      // const byte = this.readByte(data, thresholds, targetIndexCount);

      bytes.push(data);
    }

    const byte = new Array(targetIndexCount);
    byte.fill(0);
    const len = bytes.length;
    let count = 0;
    const lenHalf = len / 2;

    for (const data of bytes) {
      for (let i = 0; i < targetIndexCount; i++) {
        const threshold = thresholds[i];
        const bitData = data[i].lastValue;

        if (threshold < bitData) {
          byte[i] += lenHalf - Math.abs(lenHalf - count) + len;
        }
      }

      count++;
    }

    let uint8 = 0;
    const base = len * (len + lenHalf);
    const p = [];
    const q = [];

    for (let i = 0; i < targetIndexCount; i++) {
      const avg = byte[i] / base;
      p.push(Math.floor(avg * 100) / 100);

      if (avg > 0.4) {
        uint8 += (1 << i) * 1;
        q.push(1);
      } else {
        q.push(0);
      }
    }

    const hamingResult = this.valitadeHaming(uint8);
    const char = hamingResult.hex;
    console.log('char:' + char + '/' + uint8 + '/' + base + '/byte:' + q + '/' + p);

    for (const calced of part) {
      calced.hamingResult = hamingResult;
      calced.byte = uint8;
      const state = calced.state;
      const lastState = calced.lastState;
      const isReadable = state > 0 || lastState > 0;

      if (!isReadable) {
        continue;
      }

      if (char === lastChar) {
        charContinuous.push(hamingResult);
      } else {
        for (const hamingResult of charContinuous) {
          if (!hamingResult.isFailed) {
            for (const hamingResult of charContinuous) {
              hamingResult.isFailed = 0;
            }

            break;
          }
        }

        charContinuous.splice(0, charContinuous.length);
      }

      lastChar = char;
    }
  }

  parsecharContinuous1(part, thresholds, targetIndexCount) {
    const charContinuous = [];
    let lastChar = null;
    let startUnixTime = Date.now();
    let endUnixTime = 0;
    let min = 255;

    for (const threshold of thresholds) {
      if (min > threshold) {
        min = threshold;
      }
    }

    for (const calced of part) {
      const data = calced.data;
      const time = calced.time;
      const byte = this.readByte(data, thresholds, targetIndexCount, min);
      const hamingResult = this.valitadeHaming(byte);
      const char = hamingResult.hex;
      calced.hamingResult = hamingResult;
      calced.byte = byte;
      const state = calced.state;
      const lastState = calced.lastState;
      const isReadable = state > 0 || lastState > 0;

      if (!isReadable) {
        continue;
      }

      if (!hamingResult.isFailed) {
        startUnixTime = time > startUnixTime ? startUnixTime : time;
        endUnixTime = time > endUnixTime ? time : endUnixTime;
      }

      if (char === lastChar) {
        charContinuous.push(hamingResult);
      } else {
        for (const hamingResult of charContinuous) {
          if (!hamingResult.isFailed) {
            for (const hamingResult of charContinuous) {
              hamingResult.isFailed = 0;
            }

            break;
          }
        }

        charContinuous.splice(0, charContinuous.length);
      }

      lastChar = char;
    }
  }

  pursePerPart(part, parsed, lastChar, spanDuration, spanOffset, thresholds, targetIndexCount) {
    // let changeCount = 0;
    const cache = {};
    const cacheNulls = {};
    let nullsCount = 0;
    const nextPeakTime = part.nextPeakTime; // this.parsecharContinuous(part, thresholds, targetIndexCount);

    for (const calced of part) {
      const state = calced.state;
      const lastState = calced.lastState;
      const time = calced.time;
      const diff = nextPeakTime - time - spanOffset;
      const hamingResult = calced.hamingResult;
      const char = hamingResult.hex;
      const isReadable = state > 0 || lastState > 0;
      const weight = spanDuration + 20 * (isReadable ? 2 : 1) - Math.abs(diff);
      const firstChangeChar = char !== lastChar ? char : null;
      const currentWeight = char !== lastChar ? firstChangeChar === char ? weight * 2 : weight * 1 : weight;

      if (!hamingResult.isFailed) {
        cache[char] = cache[char] ? cache[char] + currentWeight : currentWeight;
      } else {
        cacheNulls[char] = cacheNulls[char] ? cacheNulls[char] + currentWeight : currentWeight;
      }
    } // console.log(cache);


    const targetChar = this.getMaxCountKey(cache);
    const targetCharNulls = this.getMaxCountKey(cacheNulls); // console.log(
    //     'targetChar:' +
    //         targetChar +
    //         '/targetCharNulls:' +
    //         targetCharNulls +
    //         '/weight:' +
    //         weight +
    //         '/spanDuration:' +
    //         spanDuration +
    //         '/diff:' +
    //         diff +
    //         '/spanOffset:' +
    //         spanOffset +
    //         '/time:' +
    //         time +
    //         '/nextPeakTime:' +
    //         nextPeakTime
    // );

    if (targetChar !== null) {
      // changeCount += lastChar !== targetChar ? 1 : 0;
      // const startTime = firstTime + offset;
      // this.parsecharContinuous1(part, thresholds, targetIndexCount);
      parsed.push(targetChar);
      lastChar = targetChar;
    } else if (targetCharNulls !== null) {
      // console.log(cache);
      // console.log(cacheNulls);
      // nullsCount++;
      // changeCount += lastChar !== targetCharNulls ? 1 : 0;
      parsed.push(targetCharNulls);
      lastChar = targetCharNulls;
    } else {
      // console.log(cache);
      // console.log(cacheNulls);
      nullsCount++;
    }

    this.clearMap(cache);
    this.clearMap(cacheNulls);
    part.lastChar = lastChar;
    part.nullsCount = nullsCount;
    return {
      lastChar,
      nullsCount
    };
  }

  parseParUnitTime(peakList, k, spanDuration, targetCharCount, startTimeInput, thresholds, targetIndexCount) {
    const parsed = [];
    let parseCounter = 1;
    let changeCount = 0;
    let nullsCount = 0;
    const k2 = k + 1;
    const spanOffset = Math.ceil(spanDuration / 2) + Math.floor(spanDuration * k2 / 10);
    const startTime = startTimeInput - Math.ceil(spanDuration / 2);
    console.log('parseParUnitTime k:' + k + '/spanDuration:' + spanDuration + '/spanOffset:' + spanOffset);
    const parts = {};

    for (const calced of peakList) {
      const part = parts[parseCounter] ? parts[parseCounter] : [];
      parts[parseCounter] = part;
      part.push(calced);
      const nextPeakTime = startTime + spanDuration * parseCounter + spanOffset;
      part.nextPeakTime = nextPeakTime;
      const time = calced.time;

      if (nextPeakTime <= time) {
        parseCounter++;
      }
    }

    console.log(parts);
    let lastChar = null;

    for (const parseCounter in parts) {
      const part = parts[parseCounter];
      const result = this.pursePerPart(part, parsed, lastChar, spanDuration, spanOffset, thresholds, targetIndexCount);
      changeCount += lastChar === result.lastChar ? 0 : 1;
      lastChar = result.lastChar;
      nullsCount += result.nullsCount;
    }

    const isOdd = targetCharCount % 2;
    console.log('parseParUnitTime parsed targetCharCount:' + targetCharCount + '/nullsCount:' + nullsCount + '/changeCount:' + changeCount + '/parsed.length:' + parsed.length); // if (
    //     targetCharCount === parsed.length - nullsCount - 4 + isOdd ||
    //     targetCharCount === parsed.length - nullsCount - 3 + isOdd ||
    //     targetCharCount === parsed.length - nullsCount - 2 + isOdd ||
    //     targetCharCount === parsed.length - nullsCount - 1 + isOdd ||
    //     targetCharCount === parsed.length - nullsCount + 0 + isOdd ||
    //     targetCharCount === parsed.length - nullsCount + 1 + isOdd
    // ) {

    console.log(parsed === null || parsed === void 0 ? void 0 : parsed.join(''));
    return {
      parsedCounts: changeCount - nullsCount * targetCharCount / 20,
      parsed: parsed.slice(0, targetCharCount)
    }; // }
    // return null;
  }

  preDecode(peakList, thresholds, targetIndexCount) {
    const charContinuous = [];
    let lastChar = null;
    let startUnixTime = Date.now();
    let endUnixTime = 0;
    console.log('parseExec D');

    for (const calced of peakList) {
      const data = calced.data;
      const time = calced.time;
      const byte = this.readByte(data, thresholds, targetIndexCount);
      const hamingResult = this.valitadeHaming(byte);
      const char = hamingResult.hex;
      calced.hamingResult = hamingResult;
      calced.byte = byte;
      const state = calced.state;
      const lastState = calced.lastState;
      const isReadable = state > 0 || lastState > 0;

      if (!isReadable) {
        continue;
      }

      if (!hamingResult.isFailed) {
        startUnixTime = time > startUnixTime ? startUnixTime : time;
        endUnixTime = time > endUnixTime ? time : endUnixTime;
      }

      if (char === lastChar) {
        charContinuous.push(hamingResult);
      } else {
        let isSuccess = false;

        for (const hamingResult of charContinuous) {
          if (!hamingResult.isFailed) {
            isSuccess = true;
            break;
          }
        }

        if (isSuccess) {
          for (const hamingResult of charContinuous) {
            hamingResult.isFailed = 0;
          }
        }

        charContinuous.splice(0, charContinuous.length);
      }

      lastChar = char;
    }

    return {
      startUnixTime,
      endUnixTime
    };
  }

  unsharpFilter(list, indexCount, k = 1) {
    const len = list.length;
    const width = indexCount * subCount;

    for (let i = 0; i < len; i++) {
      const row = list[i];

      for (let j = 0; j < width; j++) {
        const kernel = this.getFilterKernel(j, i);
        let amount = 0;

        for (const d of kernel) {
          if (d.x < 0 || d.y < 0 || d.x >= width || d.y >= len) {
            continue;
          }

          const v = list[d.y][d.x];
          amount += v * d.e / 9;
        }

        row[j] += amount * k;
      }
    }
  }

  getFilterKernel(x, y) {
    return [{
      x: x - 1,
      y: y - 1,
      e: -1
    }, {
      x: x - 0,
      y: y - 1,
      e: -1
    }, {
      x: x + 1,
      y: y - 1,
      e: -1
    }, {
      x: x - 1,
      y: y - 0,
      e: -1
    }, {
      x: x - 0,
      y: y - 0,
      e: 8
    }, {
      x: x + 1,
      y: y - 0,
      e: -1
    }, {
      x: x - 1,
      y: y + 1,
      e: -1
    }, {
      x: x - 0,
      y: y + 1,
      e: -1
    }, {
      x: x + 1,
      y: y + 1,
      e: -1
    }];
  }

  buildPeakList(bufferedData, targetIndexCount, unsherpMaskGain) {
    const peakList = [];
    const maxes = new Uint8Array(targetIndexCount);
    maxes.fill(0);
    const mins = new Uint8Array(targetIndexCount);
    mins.fill(255);
    const dBuffers = new Array(targetIndexCount);
    dBuffers.fill(0);
    const lastBuffers = new Array(targetIndexCount);
    lastBuffers.fill(0);
    const lastDBuffers = new Array(targetIndexCount);
    lastDBuffers.fill(0);
    let lastState = 0;
    const image = []; // console.log('parseExec A');

    for (const row of bufferedData) {
      const map = row.pop();
      const state = row.pop();
      const time = row.pop();
      image.push(map);
      const calced = {
        state,
        time,
        data: null,
        lastState
      };
      peakList.push(calced);
      lastState = state;
    }

    this.unsharpFilter(image, targetIndexCount, unsherpMaskGain);
    let rowIndex = 0;

    for (const row of image) {
      const data = [];

      for (let i = 0; i < targetIndexCount; i++) {
        const index = i; //Math.floor(i / 5);

        const offseted = index * subCount + harf + 1;
        const target = row[offseted];
        const max = maxes[index];
        const lastValue = lastBuffers[index];
        const dValue = target - lastValue;
        const lastDValue = lastDBuffers[index];
        const pValue = dValue * (lastDValue === 0 ? 1 : lastDValue);
        lastDBuffers[index] = dBuffers[index];
        dBuffers[index] = dValue;
        lastBuffers[index] = target;
        maxes[index] = target > max ? target : max;
        const min = mins[index];
        mins[index] = min > target ? target : min;
        data.push({
          target,
          pValue,
          lastValue
        });
      }

      peakList[rowIndex].data = data; // console.log('parseExec A data.length:' + data.length + '/indexCount:' + indexCount);

      rowIndex++;
    }

    return {
      peakList,
      maxes
    };
  }

  parseExec(bufferedData, indexCount, targetIndexCount, unsherpMaskGain) {
    console.log('parse bufferedData.length:' + bufferedData.length + '/indexCount:' + indexCount + '/targetIndexCount:' + targetIndexCount);
    const {
      peakList,
      maxes
    } = this.buildPeakList(bufferedData, targetIndexCount, unsherpMaskGain);

    if (bufferedData.length < 1 || peakList.length < 1) {
      return false;
    }

    console.log('parseExec B');
    const thresholds = [];

    for (let i = 0; i < targetIndexCount; i++) {
      const max = maxes[i];
      const threshold = max * 0.9;
      thresholds.push(threshold);
    } // console.log(maxes);
    // console.log(thresholds);
    // console.log('parseExec C');


    const spanDuration = this.spanDuration * 1;
    const offset = Math.ceil(spanDuration * 1.1);
    const firstTime = peakList[0].time; // console.log(
    //     'offset:' + offset + '/spanDuration:' + spanDuration
    //     //+ '/firstPeakTime:' + firstPeakTime
    // );

    const startTime = firstTime + offset;
    const {
      endUnixTime,
      startUnixTime
    } = this.preDecode(peakList, thresholds, targetIndexCount); // console.log('parseExec E');

    const targetCharCount = Math.floor((endUnixTime - startUnixTime) / spanDuration);
    const isOdd = targetCharCount % 2;
    console.log(peakList);
    const parsedCounts = {};
    const parsedMax = {};

    for (let k = 0; k < 5; k++) {
      const result = this.parseParUnitTime(peakList, k, spanDuration, targetCharCount, startTime, thresholds, targetIndexCount);

      if (result) {
        parsedCounts[k + '_'] = result.parsedCounts;
        parsedMax[k + '_'] = result.parsed;
      }
    } // console.log('parseExec F');


    const maxK = this.getMaxCountKey(parsedCounts);
    console.log(parsedCounts);
    const parsed = parsedMax[maxK];
    console.log(parsed ? parsed.join('') : null);

    try {
      this.output(parsed);
    } catch (e) {
      console.error(e);
      return null;
    }

    return parsed;
  }

  getMaxCountKey(countMap) {
    let maxValue = 0;
    let maxKey = null;

    for (const [key, value] of Object.entries(countMap)) {
      if (maxValue < value) {
        maxValue = value;
        maxKey = key;
      }
    }

    return maxKey;
  }

  clearMap(obj) {
    const keys = Object.keys(obj);

    for (const key of keys) {
      delete obj[key];
    }
  }

  readByte(data, thresholds, targetIndexCount, min = 254) {
    // const count = 255 - min;
    // for (let j = 0; j < count; j++) {
    //     let byte = 0;
    //     for (let i = 0; i < targetIndexCount; i++) {
    //         const threshold = thresholds[i];
    //         const bitData = data[i].lastValue;
    //         // console.log('threshold:' + threshold + '/bitData:' + bitData);
    //         if (threshold + j <= bitData || bitData === 255) {
    //             byte += (1 << i) * 1;
    //         }
    //     }
    //     const hamingResult = this.valitadeHaming(byte);
    //     if (!hamingResult.isFailed) {
    //         return byte;
    //     }
    // }
    let byte = 0;

    for (let i = 0; i < targetIndexCount; i++) {
      const threshold = thresholds[i];
      const bitData = data[i].lastValue; // console.log('threshold:' + threshold + '/bitData:' + bitData);

      if (threshold <= bitData) {
        byte += (1 << i) * 1;
      }
    }

    return byte;
  }

  async decode() {
    this.init();
    this.onStateChange(Reciver.state.WAITING);
    const buffer = new Uint8Array(this.analyser.frequencyBinCount);
    this.isStop = false;
    const thesholdMs = 15;
    const thesholdMsEnd = thesholdMs * 10;
    const now = Date.now();
    const futurOffset = 1000 * 60 * 60 * 24;
    const state = {
      now: now,
      lastOn: now + futurOffset,
      lastEnd: 0,
      isRecording: false
    };
    const targetIndexes = this.calcTargetIndexes();
    const indexCount = targetIndexes.length * 5;
    const targetIndexCount = this.frequencies.length;
    const bufferedData = [];
    console.log('decode');

    while (true) {
      const binVlueThreshold = this.binVlueThreshold;
      const unsherpMaskGain = this.unsherpMaskGain;
      const start = Date.now();
      this.analyser.getByteFrequencyData(buffer);
      const selected = [];
      const selectedMap = [];
      let max = 0;
      let min = 255;

      for (const index of targetIndexes) {
        for (let i = 0; i < subCount; i++) {
          const offset = i - harf;
          selectedMap.push(buffer[index + offset]);
        }

        const target = buffer[index];
        max = target > max ? target : max;
        min = target > min ? min : target;
        selected.push(target);
      }

      selected.push(start);
      const selectedSate = max >= binVlueThreshold && min >= binVlueThreshold / 2 ? 255 : max < binVlueThreshold && min < binVlueThreshold / 2 ? 0 : 128;
      selected.push(selectedSate);
      selected.push(selectedMap); // console.log(buffer);
      // console.log('state.isRecording:' + state.isRecording);
      // console.log('state.isRecording:' + state.isRecording + '/selectedSate:' + selectedSate);

      if (state.isRecording) {
        state.lastEnd = selectedSate ? start : state.lastEnd;

        if (start - state.lastEnd > thesholdMsEnd) {
          this.onStateChange(Reciver.state.PARSING);
          const result = await this.parse(bufferedData, indexCount, targetIndexCount, unsherpMaskGain); // console.log('result:' + result);

          if (result) {
            state.isRecording = false;
            this.onStateChange(Reciver.state.WAITING);
          } else {
            this.onStateChange(Reciver.state.FAIL);
            setTimeout(() => {
              state.isRecording = false;
              this.onStateChange(Reciver.state.WAITING);
            }, 3000);
          }

          bufferedData.splice(0, bufferedData.length); // console.log(bufferedData);

          await ProcessUtil.sleep(100);
        } else {
          bufferedData.push(selected);
        }
      } else {
        state.lastOn = selectedSate === 255 ? state.lastOn > start ? start : state.lastOn : start + futurOffset;

        if (start - state.lastOn >= thesholdMs) {
          this.onStateChange(Reciver.state.RECORDING);
          state.isRecording = true;
          state.lastOn = start + futurOffset;
        }
      }

      await ProcessUtil.sleep(0);

      if (this.isStop) {
        console.log('stop decoder');
        break;
      }
    }
  }

}
Reciver.state = {
  STOP: 'stop',
  WAITING: 'waiting',
  RECORDING: 'recording',
  PARSING: 'parsing',
  FAIL: 'fail'
};
;// CONCATENATED MODULE: ./node_modules/reedsolomon.es/ReedSolomon.js
/*
 * Copyright 2007 ZXing authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// package com.google.zxing.common.reedsolomon;

/**
 * <p>This class contains utility methods for performing mathematical operations over
 * the Galois Fields. Operations use a given primitive polynomial in calculations.</p>
 *
 * <p>Throughout this package, elements of the GF are represented as an {@code int}
 * for convenience and speed (but at the cost of memory).
 * </p>
 *
 * @author Sean Owen
 * @author David Olivier
 */
class GenericGF {
  /**
   * Create a representation of GF(size) using the given primitive polynomial.
   *
   * @param primitive irreducible polynomial whose coefficients are represented by
   *  the bits of an int, where the least-significant bit represents the constant
   *  coefficient
   * @param size the size of the field
   * @param b the factor b in the generator polynomial can be 0- or 1-based
   *  (g(x) = (x+a^b)(x+a^(b+1))...(x+a^(b+2t-1))).
   *  In most cases it should be 1, but for QR code it is 0.
   */
  constructor(primitive, size, b) {
    this.primitive = primitive;
    this.size = size;
    this.generatorBase = b;
    this.expTable = new Int32Array(size);
    this.logTable = new Int32Array(size);
    let x = 1;

    for (let i = 0; i < size; i++) {
      this.expTable[i] = x;
      x *= 2; // we're assuming the generator alpha is 2

      if (x >= size) {
        x ^= primitive;
        x &= size - 1;
      }
    }

    for (let i = 0; i < size - 1; i++) {
      this.logTable[this.expTable[i]] = i;
    } // logTable[0] == 0 but this should never be used


    this.zero = new GenericGFPoly(this, new Int32Array([0]));
    this.one = new GenericGFPoly(this, new Int32Array([1]));
  }

  getZero() {
    return this.zero;
  }

  getOne() {
    return this.one;
  }
  /**
   * @return the monomial representing coefficient * x^degree
   */


  buildMonomial(degree, coefficient) {
    if (degree < 0) {
      throw new ReedSolomonException();
    }

    if (coefficient === 0) {
      return this.zero;
    }

    const coefficients = new Int32Array(degree + 1);
    coefficients[0] = coefficient;
    return new GenericGFPoly(this, coefficients);
  }
  /**
   * Implements both addition and subtraction -- they are the same in GF(size).
   *
   * @return sum/difference of a and b
   */


  static addOrSubtract(a, b) {
    return a ^ b;
  }
  /**
   * @return 2 to the power of a in GF(size)
   */


  exp(a) {
    return this.expTable[a];
  }
  /**
   * @return base 2 log of a in GF(size)
   */


  log(a) {
    if (a === 0) {
      throw new ReedSolomonException();
    } // console.log(this.logTable);


    return this.logTable[a];
  }
  /**
   * @return multiplicative inverse of a
   */


  inverse(a) {
    if (a === 0) {
      throw new ReedSolomonException();
    }

    return this.expTable[this.size - this.logTable[a] - 1];
  }
  /**
   * @return product of a and b in GF(size)
   */


  multiply(a, b) {
    if (a === 0 || b === 0) {
      return 0;
    }

    return this.expTable[(this.logTable[a] + this.logTable[b]) % (this.size - 1)];
  }

  getSize() {
    return this.size;
  }

  getGeneratorBase() {
    return this.generatorBase;
  }

  toString() {
    return 'GF(0x' + this.primitive.toString(16) + ',' + this.size + ')';
  }

}
/**
 * <p>Represents a polynomial whose coefficients are elements of a GF.
 * Instances of this class are immutable.</p>
 *
 * <p>Much credit is due to William Rucklidge since portions of this code are an indirect
 * port of his C++ Reed-Solomon implementation.</p>
 *
 * @author Sean Owen
 */


class GenericGFPoly {
  /**
   * @param field the {@link GenericGF} instance representing the field to use
   * to perform computations
   * @param coefficients coefficients as ints representing elements of GF(size), arranged
   * from most significant (highest-power term) coefficient to least significant
   * @throws IllegalArgumentException if argument is null or empty,
   * or if leading coefficient is 0 and this is not a
   * constant polynomial (that is, it is not the monomial "0")
   */
  constructor(field, coefficients) {
    if (coefficients.length === 0 || !field) {
      throw new ReedSolomonException();
    }

    this.field = field;
    const coefficientsLength = coefficients.length;

    if (coefficientsLength > 1 && coefficients[0] === 0) {
      // Leading term must be non-zero for anything except the constant polynomial "0"
      let firstNonZero = 1;

      while (firstNonZero < coefficientsLength && coefficients[firstNonZero] === 0) {
        firstNonZero++;
      }

      if (firstNonZero === coefficientsLength) {
        this.coefficients = new Int32Array([0]);
      } else {
        const len = coefficientsLength - firstNonZero;
        const newCoefficients = new Int32Array(len);

        for (let i = 0; i < len; i++) {
          newCoefficients[i] = coefficients[i + firstNonZero];
        }

        newCoefficients.set(coefficients.slice(firstNonZero), 0); // System.arraycopy(coefficients,
        //     firstNonZero,
        //     this.coefficients,
        //     0,
        //     this.coefficients.length);

        this.coefficients = newCoefficients;
      }
    } else {
      this.coefficients = coefficients;
    }
  }

  getCoefficients() {
    return this.coefficients;
  }
  /**
   * @return degree of this polynomial
   */


  getDegree() {
    return this.coefficients.length - 1;
  }
  /**
   * @return true iff this polynomial is the monomial "0"
   */


  isZero() {
    return this.coefficients[0] === 0;
  }
  /**
   * @return coefficient of x^degree term in this polynomial
   */


  getCoefficient(degree) {
    // console.log('getCoefficient this.coefficients degree:' + degree);
    // console.log(this.coefficients);
    return this.coefficients[this.coefficients.length - 1 - degree];
  }
  /**
   * @return evaluation of this polynomial at a given point
   */


  evaluateAt(a) {
    const field = this.field;

    if (a === 0) {
      // Just return the x^0 coefficient
      return this.getCoefficient(0);
    }

    if (a === 1) {
      // Just the sum of the coefficients
      let result = 0;

      for (const coefficient of this.coefficients) {
        result = GenericGF.addOrSubtract(result, coefficient);
      }

      return result;
    }

    let result = this.coefficients[0];

    for (const coefficient of this.coefficients) {
      result = GenericGF.addOrSubtract(field.multiply(a, result), coefficient);
    }

    return result;
  }

  addOrSubtract(other) {
    const field = this.field;

    if (field !== other.field) {
      throw new ReedSolomonException('GenericGFPolys do not have same GenericGF field');
    }

    if (this.isZero()) {
      return other;
    }

    if (other.isZero()) {
      return this;
    }

    const isSmallLonger = this.coefficients.length > other.coefficients.length; // const coefficients = this.coefficients;

    const smallerCoefficients = isSmallLonger ? other.coefficients : this.coefficients;
    const largerCoefficients = isSmallLonger ? this.coefficients : other.coefficients; // if (smallerCoefficients.length > largerCoefficients.length) {
    // 	const temp = smallerCoefficients;
    // 	smallerCoefficients = largerCoefficients;
    // 	largerCoefficients = temp;
    // }

    const lenLarge = largerCoefficients.length;
    const sumDiff = new Int32Array(lenLarge);
    const lengthDiff = lenLarge - smallerCoefficients.length; // Copy high-order terms only found in higher-degree polynomial's coefficients

    sumDiff.set(largerCoefficients.slice(0, lengthDiff), 0); // System.arraycopy(largerCoefficients, 0, sumDiff, 0, lengthDiff);
    // console.log('lengthDiff:' + lengthDiff + '/sumDiff:' + JSON.stringify(sumDiff));

    for (let i = lengthDiff; i < lenLarge; i++) {
      sumDiff[i] = GenericGF.addOrSubtract(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
    } // console.log(sumDiff);


    return new GenericGFPoly(field, sumDiff);
  }

  multiply(param) {
    return typeof param === 'number' ? this.multiplyScalar(param) : this.multiplyGF(param);
  }

  multiplyGF(other) {
    const field = this.field;
    const aCoefficients = this.coefficients;

    if (field !== other.field) {
      throw new ReedSolomonException('GenericGFPolys do not have same GenericGF field');
    }

    if (this.isZero() || other.isZero()) {
      return field.getZero();
    } // const aCoefficients = coefficients;largerCoefficients


    const aLength = aCoefficients.length;
    const bCoefficients = other.coefficients;
    const bLength = bCoefficients.length;
    const product = new Int32Array(aLength + bLength - 1);

    for (let i = 0; i < aLength; i++) {
      const aCoeff = aCoefficients[i];

      for (let j = 0; j < bLength; j++) {
        product[i + j] = GenericGF.addOrSubtract(product[i + j], field.multiply(aCoeff, bCoefficients[j]));
      }
    }

    return new GenericGFPoly(field, product);
  }

  multiplyScalar(scalar) {
    const field = this.field;
    const coefficients = this.coefficients;

    if (scalar === 0) {
      return field.getZero();
    }

    if (scalar === 1) {
      return this;
    }

    const size = coefficients.length;
    const product = new Int32Array(size);

    for (let i = 0; i < size; i++) {
      product[i] = field.multiply(coefficients[i], scalar);
    }

    return new GenericGFPoly(field, product);
  }

  multiplyByMonomial(degree, coefficient) {
    const field = this.field;
    const coefficients = this.coefficients;

    if (degree < 0) {
      throw new ReedSolomonException();
    }

    if (coefficient === 0) {
      return this, field.getZero();
    }

    const size = coefficients.length;
    const product = new Int32Array(size + degree);

    for (let i = 0; i < size; i++) {
      product[i] = field.multiply(coefficients[i], coefficient);
    }

    return new GenericGFPoly(field, product);
  }

  divide(other) {
    const field = this.field;

    if (field !== other.field) {
      throw new ReedSolomonException('GenericGFPolys do not have same GenericGF field');
    }

    if (other.isZero()) {
      throw new ReedSolomonException('Divide by 0');
    }

    let quotient = field.getZero();
    let remainder = this;
    const denominatorLeadingTerm = other.getCoefficient(other.getDegree());
    const inverseDenominatorLeadingTerm = field.inverse(denominatorLeadingTerm);

    while (remainder.getDegree() >= other.getDegree() && !remainder.isZero()) {
      const degreeDifference = remainder.getDegree() - other.getDegree();
      const scale = field.multiply(remainder.getCoefficient(remainder.getDegree()), inverseDenominatorLeadingTerm);
      const term = other.multiplyByMonomial(degreeDifference, scale);
      const iterationQuotient = field.buildMonomial(degreeDifference, scale);
      quotient = quotient.addOrSubtract(iterationQuotient);
      remainder = remainder.addOrSubtract(term);
    }

    return [quotient, remainder];
  }

  toString() {
    const field = this.field;
    const coefficients = this.coefficients;

    if (this.isZero()) {
      return '0';
    }

    const result = []; //new StringBuilder(8 * getDegree());

    for (let degree = this.getDegree(); degree >= 0; degree--) {
      const coefficient = this.getCoefficient(degree);

      if (coefficient !== 0) {
        if (coefficient < 0) {
          if (degree === this.getDegree()) {
            result.push('-');
          } else {
            result.push(' - ');
          }

          coefficient = -coefficient;
        } else {
          if (result.length > 0) {
            result.push(' + ');
          }
        }

        if (degree === 0 || coefficient !== 1) {
          const alphaPower = field.log(coefficient);

          if (alphaPower === 0) {
            result.push('1');
          } else if (alphaPower === 1) {
            result.push('a');
          } else {
            result.push('a^');
            result.push(alphaPower);
          }
        }

        if (degree !== 0) {
          if (degree === 1) {
            result.push('x');
          } else {
            result.push('x^');
            result.push(degree);
          }
        }
      }
    }

    return result.join('');
  }

}
/**
 * <p>Implements Reed-Solomon decoding, as the name implies.</p>
 *
 * <p>The algorithm will not be explained here, but the following references were helpful
 * in creating this implementation:</p>
 *
 * <ul>
 * <li>Bruce Maggs.
 * <a href="http://www.cs.cmu.edu/afs/cs.cmu.edu/project/pscico-guyb/realworld/www/rs_decode.ps">
 * "Decoding Reed-Solomon Codes"</a> (see discussion of Forney's Formula)</li>
 * <li>J.I. Hall. <a href="www.mth.msu.edu/~jhall/classes/codenotes/GRS.pdf">
 * "Chapter 5. Generalized Reed-Solomon Codes"</a>
 * (see discussion of Euclidean algorithm)</li>
 * </ul>
 *
 * <p>Much credit is due to William Rucklidge since portions of this code are an indirect
 * port of his C++ Reed-Solomon implementation.</p>
 *
 * @author Sean Owen
 * @author William Rucklidge
 * @author sanfordsquires
 */


class ReedSolomonDecoder {
  constructor(field, isSloppy = true) {
    this.field = field;
    this.isSloppy = isSloppy;
  }
  /**
   * <p>Decodes given set of received codewords, which include both data and error-correction
   * codewords. Really, this means it uses Reed-Solomon to detect and correct errors, in-place,
   * in the input.</p>
   *
   * @param received data and error-correction codewords
   * @param twoS number of error-correction codewords available
   * @throws ReedSolomonException if decoding fails for any reason
   */


  decode(received, twoS) {
    const field = this.field;
    const poly = new GenericGFPoly(field, received);
    const syndromeCoefficients = new Int32Array(twoS);
    const scLen = syndromeCoefficients.length;
    let noError = true;
    const len = received.length;
    const generatorBase = field.getGeneratorBase();

    for (let i = 0; i < twoS; i++) {
      const evaled = poly.evaluateAt(field.exp(i + generatorBase));
      syndromeCoefficients[scLen - 1 - i] = evaled;

      if (evaled !== 0) {
        noError = false;
      }
    } // console.log('decode syndromeCoefficients noError:' + noError + '/twoS:' + twoS);
    // console.log(syndromeCoefficients);
    // console.log('decode received len:' + len);
    // console.log(received);


    if (noError) {
      return received.slice(0, len - twoS);
    }

    const syndrome = new GenericGFPoly(field, syndromeCoefficients);
    const [sigma, omega] = this.runEuclideanAlgorithm(field.buildMonomial(twoS, 1), syndrome, twoS);
    const errorLocations = this.findErrorLocations(sigma); // console.log('decode errorLocations sigma:' + sigma);
    // console.log(errorLocations);

    const errorMagnitudes = this.findErrorMagnitudes(omega, errorLocations);

    for (let i = 0; i < errorLocations.length; i++) {
      const errorLocation = errorLocations[i];
      const log = field.log(errorLocation);
      const position = len - 1 - log; // console.log('errorLocation:' + errorLocation + '/log:' + log + '/position:' + position);

      if (position < 0) {
        if (this.isSloppy) {
          continue;
        }

        throw new ReedSolomonException('Bad error location');
      }

      received[position] = GenericGF.addOrSubtract(received[position], errorMagnitudes[i]);
    }

    return received.slice(0, len - twoS);
  }

  runEuclideanAlgorithm(a, b, R) {
    const field = this.field; // Assume a's degree is >= b's

    if (a.getDegree() < b.getDegree()) {
      const temp = a;
      a = b;
      b = temp;
    }

    let rLast = a;
    let r = b;
    let tLast = field.getZero();
    let t = field.getOne(); // Run Euclidean algorithm until r's degree is less than R/2

    while (r.getDegree() >= R / 2) {
      const rLastLast = rLast;
      const tLastLast = tLast;
      rLast = r;
      tLast = t; // Divide rLastLast by rLast, with quotient in q and remainder in r

      if (rLast.isZero()) {
        // Oops, Euclidean algorithm already terminated?
        throw new ReedSolomonException('r_{i-1} was zero');
      }

      r = rLastLast;
      let q = field.getZero();
      const rLastDegree = rLast.getDegree();
      const denominatorLeadingTerm = rLast.getCoefficient(rLastDegree);
      const dltInverse = field.inverse(denominatorLeadingTerm);

      while (r.getDegree() >= rLastDegree && !r.isZero()) {
        const rDegree = r.getDegree();
        const degreeDiff = rDegree - rLastDegree;
        const scale = field.multiply(r.getCoefficient(rDegree), dltInverse);
        q = q.addOrSubtract(field.buildMonomial(degreeDiff, scale));
        r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
      }

      t = q.multiply(tLast).addOrSubtract(tLastLast);

      if (r.getDegree() >= rLastDegree) {
        throw new ReedSolomonException('Division algorithm failed to reduce polynomial?');
      }
    }

    const sigmaTildeAtZero = t.getCoefficient(0);

    if (sigmaTildeAtZero === 0) {
      console.log('runEuclideanAlgorithm a b R t sigmaTildeAtZero:' + sigmaTildeAtZero);
      console.log(a);
      console.log(b);
      console.log(R);
      console.log(t);
      throw new ReedSolomonException('sigmaTilde(0) was zero');
    }

    const inverse = field.inverse(sigmaTildeAtZero);
    const sigma = t.multiply(inverse);
    const omega = r.multiply(inverse);
    return [sigma, omega];
  }

  findErrorLocations(errorLocator) {
    const field = this.field; // This is a direct application of Chien's search

    const numErrors = errorLocator.getDegree();

    if (numErrors === 1) {
      // shortcut
      // console.log('findErrorLocations errorLocator.getCoefficient(1):' + errorLocator.getCoefficient(1) + '/numErrors:' + numErrors);
      return new Int32Array([errorLocator.getCoefficient(1)]);
    }

    const result = new Int32Array(numErrors);
    let e = 0;
    const size = field.getSize(); // console.log('findErrorLocations size:' + size + '/numErrors:' + numErrors);

    for (let i = 1; i < size && e < numErrors; i++) {
      if (errorLocator.evaluateAt(i) === 0) {
        result[e] = field.inverse(i);
        e++;
      }
    }

    if (e !== numErrors && !this.isSloppy) {
      throw new ReedSolomonException('Error locator degree does not match number of roots');
    } // console.log(result);


    return result.slice(0, e);
  }

  findErrorMagnitudes(errorEvaluator, errorLocations) {
    const field = this.field; // This is directly applying Forney's Formula

    const s = errorLocations.length;
    const result = new Int32Array(s);

    for (let i = 0; i < s; i++) {
      const xiInverse = field.inverse(errorLocations[i]);
      let denominator = 1;

      for (let j = 0; j < s; j++) {
        if (i !== j) {
          //denominator = field.multiply(denominator,
          //    GenericGF.addOrSubtract(1, field.multiply(errorLocations[j], xiInverse)));
          // Above should work but fails on some Apple and Linux JDKs due to a Hotspot bug.
          // Below is a funny-looking workaround from Steven Parkes
          const term = field.multiply(errorLocations[j], xiInverse);
          const termPlus1 = (term & 0x1) === 0 ? term | 1 : term & ~1;
          denominator = field.multiply(denominator, termPlus1);
        }
      }

      result[i] = field.multiply(errorEvaluator.evaluateAt(xiInverse), field.inverse(denominator));

      if (field.getGeneratorBase() !== 0) {
        result[i] = field.multiply(result[i], xiInverse);
      }
    }

    return result;
  }

}
/**
 * <p>Implements Reed-Solomon encoding, as the name implies.</p>
 *
 * @author Sean Owen
 * @author William Rucklidge
 */


class ReedSolomonEncoder {
  constructor(field) {
    this.field = field;
    this.cachedGenerators = [];
    const coefficients = new Int32Array([1]);
    this.cachedGenerators.push(new GenericGFPoly(field, coefficients));
  }

  buildGenerator(degree) {
    const field = this.field;
    const cachedGenerators = this.cachedGenerators;
    const len = cachedGenerators.length;

    if (degree >= len) {
      const lastIndex = len - 1;
      const generatorBase = field.getGeneratorBase();
      let lastGenerator = cachedGenerators[lastIndex];

      for (let d = lastIndex; d < degree; d++) {
        const coefficients = new Int32Array([1, field.exp(d + generatorBase)]);
        const nextGenerator = lastGenerator.multiply(new GenericGFPoly(field, coefficients));
        cachedGenerators.push(nextGenerator);
        lastGenerator = nextGenerator;
      }
    }

    return cachedGenerators[degree];
  }

  encode(toEncode, ecBytes) {
    const field = this.field;

    if (ecBytes === 0) {
      throw new ReedSolomonException('No error correction bytes');
    }

    const size = toEncode.length;
    let dataBytes = size - ecBytes;

    if (dataBytes <= 0) {
      // console.log('size:' + size + '/ecBytes:' + ecBytes);
      throw new ReedSolomonException('No data bytes provided');
    }

    const generator = this.buildGenerator(ecBytes);
    const infoCoefficients = new Int32Array(dataBytes);
    infoCoefficients.set(toEncode.slice(0, dataBytes), 0); // System.arraycopy(toEncode, 0, infoCoefficients, 0, dataBytes);

    const info = new GenericGFPoly(field, infoCoefficients);
    const info2 = info.multiplyByMonomial(ecBytes, 1);
    const remainder = info2.divide(generator)[1];
    const coefficients = remainder.getCoefficients();
    const numZeroCoefficients = ecBytes - coefficients.length;
    const result = new Int32Array(size);
    result.fill(0);
    result.set(infoCoefficients, 0);
    const offset = dataBytes + numZeroCoefficients;
    result.set(coefficients, offset); // console.log('encode toEncode');
    // console.log(toEncode);
    // console.log('encode result');
    // console.log(result);
    // System.arraycopy(coefficients, 0, toEncode, dataBytes + numZeroCoefficients, coefficients.length);

    return result;
  }

}
/**
 * <p>Thrown when an exception occurs during Reed-Solomon decoding, such as when
 * there are too many errors to correct.</p>
 *
 * @author Sean Owen
 */


class ReedSolomonException extends Error {
  constructor(message) {
    super(message);
  }

}
const AZTEC_DATA_12 = {
  primitive: 0x1069,
  bitNum: 12,
  b: 1
}; // x^12 + x^6 + x^5 + x^3 + 1 = 1 0000 0110 1001=4201=0x1069 r=12

const AZTEC_DATA_10 = {
  primitive: 0x409,
  bitNum: 10,
  b: 1
}; // x^10 + x^3 + 1 =100 0000 1001=1033=0x409 r=10

const AZTEC_DATA_6 = {
  primitive: 0x43,
  bitNum: 6,
  b: 1
}; // x^6 + x + 1=100 0011=67=0x43

const AZTEC_PARAM = {
  primitive: 0x13,
  bitNum: 4,
  b: 1
}; // x^4 + x + 1=1 0011 = 19=0x13

const QR_CODE_FIELD_256 = {
  primitive: 0x011d,
  bitNum: 8,
  b: 0
}; // x^8 + x^4 + x^3 + x^2 + 1=1 0001 1101=281=0x011d

const DATA_MATRIX_FIELD_256 = {
  primitive: 0x012d,
  bitNum: 8,
  b: 1
}; // x^8 + x^5 + x^3 + x^2 + 1=1 0010 1101=297=0x012d

const AZTEC_DATA_8 = DATA_MATRIX_FIELD_256;
const MAXICODE_FIELD_64 = AZTEC_DATA_6;
const ByteAs16bit = {
  primitive: 0x10029,
  bitNum: 16,
  b: 1
}; // D^16+D^5+D^3+D^2+1= 1 0000 0000 0010 1101 =65581=0x10029 r=16;

const ByteAs14bit = {
  primitive: 0x402b,
  bitNum: 14,
  b: 1
}; // D^14+D^5+D^3+D+1= 100 0000 0010 1011 =16427=0x402b r=14;

const ByteAs12bit = AZTEC_DATA_12;
const ByteAs10bit = AZTEC_DATA_10;
const ByteAs8bit = AZTEC_DATA_8;
const ByteAs6bit = AZTEC_DATA_6;
const ByteAs4bit = AZTEC_PARAM;
const presets = {
  ByteAs16bit,
  ByteAs14bit,
  ByteAs12bit,
  ByteAs10bit,
  ByteAs8bit,
  ByteAs6bit,
  ByteAs4bit,
  AZTEC_DATA_12,
  AZTEC_DATA_10,
  AZTEC_DATA_6,
  AZTEC_PARAM,
  QR_CODE_FIELD_256,
  DATA_MATRIX_FIELD_256,
  AZTEC_DATA_8,
  MAXICODE_FIELD_64
};
const Cache = {};
class ReedSolomonES {
  static encodeRaw(i32a, errorCorrectionRedundantUnitCount, primitive, bitNum, b) {
    const key = JSON.stringify([primitive, bitNum, b, 'e']);
    let rsEncoder = Cache[key];

    if (!rsEncoder) {
      const pow = Math.pow(2, bitNum);
      const ggf = new GenericGF(primitive, pow, b);
      rsEncoder = new ReedSolomonEncoder(ggf);
      Cache[key] = rsEncoder;
    }

    return rsEncoder.encode(i32a, errorCorrectionRedundantUnitCount);
  }

  static decodeRaw(i32a, errorCorrectionRedundantUnitCount, primitive, bitNum, b, isSloppy) {
    const key = JSON.stringify([primitive, bitNum, b, 'd']);
    let rsDecoder = Cache[key];

    if (!rsDecoder) {
      const pow = Math.pow(2, bitNum);
      const ggf = new GenericGF(primitive, pow, b);
      rsDecoder = new ReedSolomonDecoder(ggf, isSloppy);
      Cache[key] = rsDecoder;
    }

    return rsDecoder.decode(i32a, errorCorrectionRedundantUnitCount);
  }

  static copyToU8a(i32a, bitNum) {
    const dataLen = i32a.length;
    let lastOne = '';
    const newDataLength = Math.ceil(dataLen * bitNum / 8); // const has = (dataLen * 8) % bitNum;

    const u8a = new Uint8Array(newDataLength);
    let charCounter = 0;
    const fill = new Array(bitNum);
    fill.fill('0');
    const fill0 = fill.join(''); // const a = [];
    // const b = [];

    for (let octet of i32a) {
      const bits = (fill0 + octet.toString(2)).slice(-1 * bitNum);
      const current = lastOne + bits; // b.push(current);

      const loopCount = Math.floor(current.length / 8);

      for (let i = 0; i < loopCount; i++) {
        const bitStr = current.substring(i * 8, (i + 1) * 8);
        u8a[charCounter] = parseInt(bitStr, 2); // a.push(bitStr);

        charCounter++;
      }

      lastOne = current.substring(loopCount * 8);
    } // console.log(b);
    // console.log(a);


    if (!lastOne) {
      const a = new Array(8 - lastOne.length);
      a.fill('0');
      u8a[charCounter] = parseInt(lastOne + a.join(''), 2);
    }

    return u8a;
  }

  static copyToI32a(u8a, bitNum, isFillBit = true) {
    const dataLen = u8a.length;
    let lastOne = '';
    let lcm = bitNum;
    const bitnumHarf = bitNum / 2;
    let add = 0;

    if (isFillBit && bitNum !== 8) {
      const mod = dataLen % bitnumHarf;
      add = mod > 0 ? bitnumHarf - mod : mod;
    } // console.log('lcm:' + lcm + '/add:' + add + '/' + bitnumHarf);


    const newDataLength = Math.ceil((dataLen + add) * 8 / bitNum);
    const i32a = new Int32Array(newDataLength);
    const fill = new Array(8);
    fill.fill('0');
    const fill0 = fill.join('');
    let charCounter = 0;

    for (let octet of u8a) {
      const bits = (fill0 + octet.toString(2)).slice(-8);
      const current = lastOne + bits;
      const loopCount = Math.floor(current.length / bitNum);

      for (let i = 0; i < loopCount; i++) {
        const bitStr = current.substring(i * bitNum, (i + 1) * bitNum);
        i32a[charCounter] = parseInt(bitStr, 2);
        charCounter++;
      }

      lastOne = current.substring(loopCount * bitNum);
    } // console.log('lastOne:' + lastOne + '/newDataLength:' + newDataLength + '/bitNum:' + bitNum + '/dataLen:' + dataLen);


    if (lastOne) {
      const a = new Array(bitNum - lastOne.length);
      a.fill('0');
      const bits = lastOne + a.join(''); // console.log('bits:' + bits);

      i32a[charCounter] = parseInt(bits, 2);
    } // console.log(i32a);


    return i32a;
  } //2^{r}>N>K>0 ,t=(N-K)/2


  static encode(u8a, presetName, errorCorrectionRetio) {
    const preset = presets[presetName];

    if (!preset) {
      return;
    }

    const bitNum = preset.bitNum;
    const primitive = preset.primitive;
    const b = preset.b;
    const i32a = ReedSolomonES.copyToI32a(u8a, bitNum, true);
    const newDataLength = i32a.length;
    const maxWordLength = Math.pow(2, bitNum);
    const retio = errorCorrectionRetio * 2 + 1;
    const N = Math.ceil(retio * newDataLength);
    const wordCount = Math.ceil(N / maxWordLength);
    const wordKtmp = Math.floor(maxWordLength / retio);
    const wordK = Math.ceil((wordKtmp > newDataLength ? wordKtmp : newDataLength) / wordCount);
    const result = new Int32Array(newDataLength * retio);
    let leftLength = newDataLength; // console.log(newDataLength + '/' + errorCorrectionRetio + '/retio:' + retio + '/wordK:' + wordK + '/wordCount:' + wordCount);

    for (let i = 0; i < wordCount; i++) {
      const wordKCurrent = leftLength > wordK ? wordK : leftLength;
      const errorCorrectionRedundantUnitCount = Math.floor(wordKCurrent * errorCorrectionRetio * 2);
      const tempN = wordKCurrent + errorCorrectionRedundantUnitCount;
      leftLength -= wordK;
      const start = i * wordK;

      if (start > newDataLength || wordKCurrent < retio) {
        break;
      }

      const end = start + wordKCurrent > newDataLength ? newDataLength : start + wordKCurrent;
      const toEncode = new Int32Array(tempN);
      toEncode.fill(0);
      toEncode.set(i32a.slice(start, end), 0); // console.log('toEncode');
      // console.log(toEncode);

      const encorded = ReedSolomonES.encodeRaw(toEncode, errorCorrectionRedundantUnitCount, primitive, bitNum, b);
      const offset = tempN * i;
      result.set(encorded, offset); // console.log('encorded offset:' + offset);
      // console.log(encorded);
      // console.log(result);
    } // console.log('encode presetName:' + presetName + '/preset:' + JSON.stringify(preset));


    return ReedSolomonES.copyToU8a(result, bitNum);
  }

  static decodeStrict(u8a, presetName, errorCorrectionRetio) {
    return ReedSolomonES.decode(u8a, presetName, errorCorrectionRetio, false);
  }

  static decode(u8a, presetName, errorCorrectionRetio, isSloppy) {
    const preset = presets[presetName];

    if (!preset) {
      return;
    }

    const bitNum = preset.bitNum;
    const primitive = preset.primitive;
    const b = preset.b;
    const i32a = ReedSolomonES.copyToI32a(u8a, bitNum);
    const newDataLength = i32a.length;
    const maxWordLength = Math.pow(2, bitNum);
    const retio = errorCorrectionRetio * 2 + 1;
    const K = Math.ceil(newDataLength / retio);
    const wordCount = Math.ceil(newDataLength / maxWordLength);
    const wordKtmp = Math.floor(maxWordLength / retio);
    const wordK = Math.ceil((wordKtmp > K ? wordKtmp : K) / wordCount);
    const result = new Int32Array(K);
    let leftLength = K;

    for (let i = 0; i < wordCount; i++) {
      const wordKCurrent = leftLength > wordK ? wordK : leftLength;
      const errorCorrectionRedundantUnitCount = Math.floor(wordKCurrent * errorCorrectionRetio * 2);
      const tempN = wordKCurrent + errorCorrectionRedundantUnitCount;
      leftLength -= wordKCurrent;
      const start = i * tempN;
      const end = start + tempN > newDataLength ? newDataLength : start + tempN;
      const toDecode = new Int32Array(tempN);
      const na = i32a.slice(start, end);
      console.log('i:' + i + '/na:' + na.length + '/tempN:' + tempN);

      if (na.length < 1) {
        break;
      }

      toDecode.set(na, 0);
      const decorded = ReedSolomonES.decodeRaw(toDecode, errorCorrectionRedundantUnitCount, primitive, bitNum, b, isSloppy);
      const offset = wordK * i;
      result.set(decorded, offset);
    }

    console.log('decode presetName:' + presetName + '/preset:' + JSON.stringify(preset));
    return ReedSolomonES.copyToU8a(result, bitNum);
  }

}
;// CONCATENATED MODULE: ./node_modules/convolutionalcode.es/ConvolutionalCode.js
/*Alessandro Corbetta
 * corbisoft@gmail.com
 * Conv Encoder simulator 1/02/11
 *
 */
class Util {
  static hammingWeightByInt(a, b, codewordBit) {
    let c = a ^ b;
    let weight = 0;

    for (let i = 0; i < codewordBit; i++) {
      weight += c % 2;
      c >>= 1;
    }

    return weight;
  }

  static hammingWeightByStr(a, b) {
    let weight = 0;

    for (let i = 0; i < a.length; i++) {
      if (a.charAt(i) !== b.charAt(i)) {
        weight++;
      }
    }

    return weight;
  }

  static getCodeWordStr(codeWordBitCount, codeWord) {
    const bits = new Array(codeWordBitCount);
    let tmpCdWrd = codeWord * 1;

    for (let i = 0; i < codeWordBitCount; i++) {
      bits[i] = tmpCdWrd % 2;
      tmpCdWrd >>= 1;
    }

    return bits.reverse().join('');
  }

  static getCodeWordBits(codeWordBitCount, codeWord) {
    const bits = [];

    for (let i = 0; i < codeWordBitCount; i++) {
      const v = (codeWord >>> i) % 2;
      bits.push(v);
    }

    return bits;
  }

  static getUint8BitList(uint8) {
    const cache = Util.uint8Cache;

    if (cache[uint8]) {
      return cache[uint8];
    }

    const bits = Util.getCodeWordBits(8, uint8);
    cache[uint8] = bits;
    return bits;
  }

  static toU8aFromBitArray(flatList, count) {
    const newU8a = new Uint8Array(count);

    for (let i = 0; i < count; i++) {
      const start = i * 8;
      const end = start + 8;
      const sub = flatList.slice(start, end);
      let v = 0;

      for (let j = 0; j < 8; j++) {
        v += sub[j] << j;
      }

      newU8a[i] = v;
    }

    return newU8a;
  }

} // Dimensione dello spazio degli stati i.e. log_2 (states) | bit parola di codice


Util.uint8Cache = new Array(256);
const CodifEsempioLibro540 = {
  totStatesLog: 2,
  totCodeBit: 3,
  // stato | bit di info | parola di codice | stato in out
  data: [[0, 0, '000', 0], [0, 1, '111', 2], [1, 0, '001', 0], [1, 1, '110', 2], [2, 0, '011', 1], [3, 0, '101', 3], [3, 1, '010', 1], [2, 1, '100', 3]]
};
const BitLength2 = {
  totStatesLog: 2,
  totCodeBit: 2,
  // stato | bit di info | parola di codice | stato in out
  data: [[0, 0, '00', 0], [0, 1, '11', 2], [1, 0, '00', 2], [1, 1, '11', 0], [2, 1, '01', 1], [2, 0, '01', 3], [3, 0, '01', 1], [3, 1, '10', 3]]
};

class State {
  static getTotStatesLog() {
    return State.totStatesLog;
  }

  static isTotStatesLogSet() {
    return State.totStatesLogSet;
  }

  static setTotStatesLog(totStatesLog) {
    if (!State.totStatesLogSet) {
      State.totStatesLog = totStatesLog;
      State.totStatesLogSet = true;
    }
  }

  constructor(myState) {
    this.myState = myState;
  }

  getMyState() {
    return this.myState;
  }

  hashCode() {
    const prime = 31;
    const state = this.myState;
    const hashCode = !state ? 0 : typeof state !== 'object' ? 1 : state.hashCode();
    const result = prime * 1 + hashCode;
    return result;
  }

  setMyState(myState) {
    this.myState = myState;
  }

}

State.totStatesLog = void 0;
State.totStatesLogSet = false;

class StateAndInfoBit {
  constructor(myStateInt, myInfoBit, myCodeWord, totCodeBit = 0) {
    this.initState = myStateInt;
    this.myState = new State(myStateInt);
    this.myInfoBit = myInfoBit;
    this.myCodeWord = myCodeWord;
    this.codeWordBitCount = totCodeBit;
  }

  getMyState() {
    return this.myState;
  }

  getMyInfoBit() {
    return this.myInfoBit;
  }

  getMyCodeWord() {
    return this.myCodeWord;
  }

  getMyCodeWordStr() {
    return Util.getCodeWordStr(this.codeWordBitCount, this.myCodeWord);
  }

  getMyCodeWordBits() {
    return Util.getCodeWordBits(this.codeWordBitCount, this.myCodeWord);
  }

  toString() {
    return JSON.stringify([this.myState.hashCode(), this.myInfoBit, this.initState]);
  }

}

class StateWithInflow extends State {
  constructor(myState) {
    super(myState);
    this.isInitialized = false;
    this.indexVect = 0;
  }

  getMyInflows() {
    return this.myInflows;
  }

  setInFlow(inFlow) {
    if (!this.isInitialized) {
      this.myInflows = new Array(2);
      this.isInitialized = true;
    }

    this.myInflows[this.indexVect] = inFlow;
    this.indexVect++;
  }

  toString() {
    const sb = ['State: ' + this.getMyState().toString()];

    if (this.isInitialized) {
      const myInflows0 = this.myInflows[0];
      sb.push(!myInflows0 ? ' first inflow not init ' : ' first inflow: ' + (myInflows0.getMyCodeWord() * 1).toString(2) + ' from ' + myInflows0.getMyState().getMyState().toString());
      const myInflows1 = this.myInflows[1];
      sb.push(!myInflows1 ? ' second inflow not init ' : ' second inflow: ' + (myInflows1.getMyCodeWord() * 1).toString(2) + ' from ' + myInflows1.getMyState().getMyState().toString());
    } else {
      sb.push(' not yet initialized!');
    }

    return sb.join('');
  }

}

class DecTrallisColumn {
  constructor(totStates, prev, refTrellis, codewordBit) {
    this.column = new Array(totStates);
    this.totStates = totStates;

    if (!prev) {
      this.setFirstSection();
      this.imAmFirst = true;
    } else {
      this.imAmFirst = false;
      this.setGeneralSection();
      this.prev = prev;
    }

    this.refTrellis = refTrellis;
    this.codewordBit = codewordBit;
  }

  getColumn() {
    return this.column;
  }

  setColumn(column) {
    this.column = column;
  }

  setGeneralSection(startIndex = 0) {
    const totStates = this.totStates;

    for (let i = startIndex; i < totStates; i++) {
      const col = new DecTrallisCell();
      col.setMyState(i);
      col.setFake();
      this.column[i] = col;
    }
  }

  setFirstSection() {
    const col = new DecTrallisCell();
    col.setStarter();
    col.setMyState(0);
    this.column[0] = col;
    this.setGeneralSection(1);
  }

  createWordSection(codeWord) {
    const its = this.refTrellis.orderedFinalStates; //stati di arrivo sul traliccio

    let zeroMetric = 0;
    let rejoinZeroStat = true; //mi sono ricongiunto allo stato iniziale?

    const state = {
      minMetric: 0,
      minState: -1,
      stateCons: 0,
      tempMetric: 0,
      from: new Array(2)
    };

    for (const now of its) {
      for (let i = 0; i < 2; i++) {
        this.codeParBit(now, codeWord, state, i);
      }

      if (state.stateCons === 0) {
        zeroMetric = state.tempMetric;
      } else if (state.tempMetric < zeroMetric) {
        rejoinZeroStat = false;
      }

      state.stateCons++;
    }

    const sb = [];
    this.column[state.minState].recursivePrint(sb);
    const infowordsIcarry = sb;
    return {
      flushoutOrder: false,
      infowordsIcarry
    };
  }

  codeParBit(now, codeWord, state, i) {
    let changed = false; // ho fatto delle modifiche al tratto che considero

    const fromFlow = now.getMyInflows(); //dato il mio stato capisco da quale coppia di stati entro

    const stateCons = state.stateCons;
    const currentCol = this.column[stateCons];
    const currentFormFlow = fromFlow[i];
    const currentForm = currentFormFlow.getMyState().getMyState() * 1; //trovo gli indici della coppia di stati di input

    state.from[i] = currentForm;
    const prevCol = this.prev.getColumn()[currentForm];

    if (prevCol.isActive) {
      const prevMyWholeMetric = prevCol.getMyWholeMetric();
      const tempMetric = Util.hammingWeightByInt(codeWord, currentFormFlow.getMyCodeWord() * 1, this.codewordBit) + prevMyWholeMetric;

      if (currentCol.isActive) {
        //se io sono attivo confronto
        if (tempMetric < currentCol.getMyWholeMetric()) {
          //devo aggiornare
          currentCol.setMyWholeMetric(tempMetric);
          currentCol.from = prevCol;
          currentCol.setMyInfoBit(currentFormFlow.getMyInfoBit());

          if (state.minState === -1) {
            state.minState = stateCons;
            state.minMetric = tempMetric;
          } else if (tempMetric < state.minMetric) {
            state.minState = stateCons;
            state.minMetric = tempMetric;
          }
        }
      } else {
        currentCol.isActive = true;
        currentCol.setMyWholeMetric(tempMetric);
        currentCol.from = prevCol;
        currentCol.setMyInfoBit(currentFormFlow.getMyInfoBit());

        if (state.minState === -1) {
          state.minState = stateCons;
          state.minMetric = tempMetric;
        } else if (tempMetric < state.minMetric) {
          state.minState = stateCons;
          state.minMetric = tempMetric;
        }
      }

      state.tempMetric = tempMetric;
    } else {
      console.log('\t\t not active! skipping...');
    }

    return {};
  }

}

class DecTrallisCell {
  constructor() {
    this.isActive = false;
    this.from = null;
    this.myInfoBit = null;
    this.myState = null;
    this.isActiveForGraph = null;
  }

  getMyState() {
    return myState;
  }

  setMyState(myState) {
    this.myState = myState;
  }

  getMyInfoBit() {
    return this.myInfoBit;
  }

  setMyInfoBit(myInfoBit) {
    this.myInfoBit = myInfoBit;
  }

  setStarter() {
    this.isActive = true;
    this.myWholeMetric = 0;
    this.from = null;
  }

  setFake() {
    this.isActive = false;
  }

  getMyWholeMetric() {
    return this.myWholeMetric;
  }

  setMyWholeMetric(myWholeMetric) {
    this.myWholeMetric = myWholeMetric;
  }

  recursivePrint(sb) {
    if (this.from != null) {
      this.from.recursivePrint(sb);
      sb.push(this.myInfoBit);
    }
  }

}

class Trellis {
  constructor(trellisConfig = CodifEsempioLibro540) {
    this.trellisMap = new Map();
    this.codingCorrespMap = new Map();
    this.loadTrellis(trellisConfig);
  }

  loadTrellis(trellisConfig) {
    this.totStatesLog = trellisConfig.totStatesLog;
    this.totCodeBit = trellisConfig.totCodeBit;
    const data = trellisConfig.data;
    const len = 1 << this.totStatesLog; //4

    const lenPlus = 1 << this.totStatesLog + 1; //8

    const ouputAlreadyConsid = new Array(len);
    ouputAlreadyConsid.fill(null);

    for (let i = 0; i < lenPlus; i++) {
      const row = data[i];
      const state = row[0];
      const infoBit = row[1];
      const codeword = parseInt(row[2], 2);
      const outState = row[3];
      const from = new StateAndInfoBit(state, infoBit, codeword, this.totCodeBit);
      let to = ouputAlreadyConsid[outState];

      if (to == null) {
        to = new StateWithInflow(outState);
        ouputAlreadyConsid[outState] = to;
      }

      const fromKey = from.toString();
      this.trellisMap.set(fromKey, to);
      this.codingCorrespMap.set(fromKey, from);
    } //backward link 4 decoding


    const itOnKeys = this.trellisMap.keys();

    for (const key of itOnKeys) {
      const from = this.codingCorrespMap.get(key);
      this.trellisMap.get(key).setInFlow(from);
    }

    const orderedFinalStates = [];

    for (const value of this.trellisMap.values()) {
      orderedFinalStates.push(value);
    }

    orderedFinalStates.sort();
    this.orderedFinalStates = ouputAlreadyConsid;
    return true;
  }

  codedOut(stateInput, infoBit) {
    const stWithInfoTmp1 = new StateAndInfoBit(stateInput.myState, infoBit);
    const stWithInfoTmp2 = this.codingCorrespMap.get(stWithInfoTmp1.toString());
    const codeWord = stWithInfoTmp2.getMyCodeWordBits();
    const state = this.trellisMap.get(stWithInfoTmp2.toString());
    return {
      codeWord,
      state
    };
  }

}

class Encoder {
  constructor(trellisConfig) {
    this.trellis = new Trellis(trellisConfig);
    this.totStatesLog = this.trellis.totStatesLog;
    this.codeWordBit = this.trellis.totCodeBit;
    this.reset();
  }

  reset() {
    this.state = new State(0);
  }

  encode(infoBitInput) {
    const infoBit = infoBitInput !== 0 ? 1 : 0;
    const outWord = this.trellis.codedOut(this.state, infoBit);
    this.state = outWord.state;
    return outWord.codeWord;
  }

}
class DecodingTrallisSupport {
  constructor(totStates, refTrallis) {
    this.totStates = totStates;
    this.refTrallis = refTrallis;
    this.codewordBit = this.refTrallis.totCodeBit;
    this.reset();
  }

  reset() {
    this.myColumns = [this.createDecTrallisColumn()];
    this.myTime = 0;
  }

  createDecTrallisColumn(col = null) {
    return new DecTrallisColumn(this.totStates, col, this.refTrallis, this.codewordBit);
  }

  addSection(codeWord) {
    const myCol = this.myColumns[this.myTime];
    const newCol = this.createDecTrallisColumn(myCol);
    this.myTime++;
    this.myColumns[this.myTime] = newCol;
    const decOutput = newCol.createWordSection(codeWord);
    return decOutput.infowordsIcarry;
  }

}
class VitDecoder {
  constructor(trellisConfig) {
    this.trellis = new Trellis(trellisConfig);
    this.totStatesLog = this.trellis.totStatesLog;
    this.codeWordBit = this.trellis.totCodeBit;
    this.reset();
  }

  reset() {
    this.myState = new State(0);
    this.myDecSupp = new DecodingTrallisSupport(1 << this.totStatesLog, this.trellis);
  }

  addTransmittedWord(word) {
    const codeWordNum = parseInt(word, 2);
    return this.myDecSupp.addSection(codeWordNum).join('');
  }

  addSection(codeWordNum) {
    return this.myDecSupp.addSection(codeWordNum);
  }

}
class ConvolutionalCode {
  constructor(trellisConfig) {
    this.cache = {};
    this.encoder = new Encoder(trellisConfig);
    this.decoder = new VitDecoder(trellisConfig);
  }

  reset(trellisConfig) {
    this.encoder = new Encoder(trellisConfig);
    this.decoder = new VitDecoder(trellisConfig);
  }

  encode(u8a) {
    const encoder = this.encoder;
    const bitsList = [];
    encoder.reset();
    let lastList = [];

    for (const uint8 of u8a) {
      const bits = Util.getUint8BitList(uint8);
      bitsList.push(bits.join(''));

      for (const bit of bits) {
        const cwBits = encoder.encode(bit);
        lastList.push(cwBits);
      }
    }

    const flatList = lastList.flat();
    const count = u8a.length * encoder.codeWordBit;
    return Util.toU8aFromBitArray(flatList, count);
  }

  decode(u8a) {
    const decoder = this.decoder;
    decoder.reset();
    let bitsList = [];

    for (const uint8 of u8a) {
      const bits = Util.getUint8BitList(uint8);

      for (const bit of bits) {
        bitsList.push(bit);
      }
    }

    const bitsLista = bitsList.flat();
    const codeWordBit = decoder.codeWordBit;
    const count = Math.ceil(bitsLista.length / codeWordBit);
    let lastOne = [];

    for (let i = 0; i < count; i++) {
      const start = i * codeWordBit;
      const end = start + codeWordBit;
      const sub = bitsLista.slice(start, end);
      let v = 0;

      for (let j = 0; j < codeWordBit; j++) {
        v += sub[j] << j;
      }

      lastOne = decoder.addSection(v);
    }

    const countByte = Math.ceil(u8a.length / codeWordBit);
    return Util.toU8aFromBitArray(lastOne, countByte);
  }

}
;// CONCATENATED MODULE: ./bufferdwebaudiomodem.js



const defaultConf = {
  activeDuration: 40,
  pauseDuration: 0,
  binVlueThreshold: 200,
  spanDuration: 40,
  unsherpMaskGain: 2
};
const RSByteLength = ['ByteAs4bit', 'ByteAs6bit', 'ByteAs8bit', 'ByteAs10bit', 'ByteAs12bit', 'ByteAs14bit', 'ByteAs16bit'];
class bufferdwebaudiomodem {
  constructor(condition) {
    //
    this.init(condition);
    this.oscillator = null;
    this.reciver = null;
    this.msPerByte = 2;

    this.onEncodeProgress = progress => {
      console.log(progress);
    };

    this.onStateChange = state => {
      console.log(state);
    };
  }

  init(condition = defaultConf) {
    this.activeDuration = condition.activeDuration;
    this.pauseDuration = condition.pauseDuration;
    this.binVlueThreshold = condition.binVlueThreshold;
    this.spanDuration = condition.spanDuration;
    this.isUseRS = condition.isUseRS;
    this.errorCrrectionReduntantRetio = condition.errorCrrectionReduntantRetio;
    this.presetName = condition.presetName;
    this.isUseCC = condition.isUseCC;
    this.ccRate = condition.ccRate === 2 ? BitLength2 : CodifEsempioLibro540;

    if (this.isUseCC * 1 === 1) {
      this.ConvolutionalCode = new ConvolutionalCode(this.ccRate);
    }

    this.correctRate = (this.isUseRS * 1 === 1 ? 1 + this.errorCrrectionReduntantRetio * 2 : 1) * (this.isUseCC * 1 === 1 ? this.ccRate === BitLength2 ? 2 : 3 : 1);
    this.msPerByte = 2 * (this.activeDuration + this.pauseDuration) * this.correctRate;
    this.unsherpMaskGain = condition.unsherpMaskGain;
  }

  encode(inputU8a) {
    if (!this.oscillator) {
      this.oscillator = new Oscillator();
    }

    this.oscillator.init();
    this.oscillator.activeDuration = this.activeDuration;
    this.oscillator.pauseDuration = this.pauseDuration;
    let inputU8aEncoded = inputU8a;

    if (this.isUseRS * 1 === 1 && RSByteLength.includes(this.presetName)) {
      inputU8aEncoded = ReedSolomonES.encode(inputU8aEncoded, this.presetName, this.errorCrrectionReduntantRetio);
    }

    if (this.isUseCC * 1 === 1) {
      inputU8aEncoded = this.ConvolutionalCode.encode(inputU8aEncoded);
    }

    this.oscillator.onProgress = this.funcOnEncodeProgress;

    const func = async resolve => {
      const end = () => {
        resolve();
        this.oscillator.end();
      };

      await this.oscillator.encode(inputU8aEncoded, end, end, false);
    };

    return new Promise(func);
  }

  decodeStart() {
    if (!this.reciver) {
      this.reciver = new Reciver();
      this.reciver.setOutputType('Uint8Array');
    }

    this.reciver.stop();
    console.log('decodeStart stop 1');
    this.reciver.onStateChange = this.onStateChange;

    this.reciver.onOutput = u8a => {
      let decodeU8a = u8a;
      console.log(u8a);
      console.log('onOutput 1:' + decodeU8a + '/this.isUseCC:' + this.isUseCC + '/this.isUseRS :' + this.isUseRS + '/' + this.reciver.outputType);

      if (this.isUseCC * 1 === 1) {
        console.log('onOutput 2:' + decodeU8a);
        decodeU8a = this.ConvolutionalCode.decode(decodeU8a);
        console.log('onOutput 3:' + decodeU8a);
      }

      console.log('onOutput 4:' + decodeU8a);

      if (this.isUseRS * 1 === 1 && RSByteLength.includes(this.presetName)) {
        console.log('onOutput 5:' + decodeU8a);
        decodeU8a = ReedSolomonES.decode(decodeU8a, this.presetName, this.errorCrrectionReduntantRetio);
        console.log('onOutput 6:' + decodeU8a);
      }

      console.log('onOutput 7:' + decodeU8a);
      this.funcOnDecoded(decodeU8a);
    };

    this.reciver.setBinVlueThreshold(this.binVlueThreshold);
    this.reciver.setSpanDuration(this.spanDuration);
    this.reciver.setUnsherpMaskGain(this.unsherpMaskGain);
    this.reciver.setOutputType('Uint8Array');
    setTimeout(() => {
      this.reciver.start();
      this.reciver.setOutputType('Uint8Array');
      console.log('decodeStart start 1');
    }, 100);
  }

  decodeStop() {
    console.log('decodeStop stop');

    if (this.reciver) {
      this.reciver.stop();
    }
  }

  setOnEncodeProgress(func) {
    this.funcOnEncodeProgress = func;
  }

  setOnDecoded(func) {
    this.funcOnDecoded = func;
  }

}
;// CONCATENATED MODULE: ./index.js



V.init();

class index_Encoder {
  constructor(webaudiomodem, encodBtnId, clearBtnId, encodeInputId = 'encode-input', progressId, transmissionTimeId = 'transmission-time', incrementTimesId = 'increment-times') {
    this.webaudiomodem = webaudiomodem;
    const encodBtnElm = V.gid(encodBtnId);
    const clearBtnElm = V.gid(clearBtnId);
    const encodeInputElm = V.gid(encodeInputId);
    const progressElm = V.gid(progressId);
    const transmissionTimeElm = V.gid(transmissionTimeId);
    const incrementTimesElm = V.gid(incrementTimesId);

    const func = async () => {
      this.webaudiomodem.init();
      const val = encodeInputElm.value;
      console.log(val + '/' + this.webaudiomodem.msPerByte);
      const u8a = B64Util.s2u8a(val);
      const tt = Math.ceil(this.webaudiomodem.msPerByte * u8a.length) / 1000;
      transmissionTimeElm.textContent = tt + 'sec';
      const it = this.webaudiomodem.correctRate;
      incrementTimesElm.textContent = 'x' + it;
    };

    this.calcSecFunc = func;
    V.ael(encodeInputElm, 'input', func);

    const progressBarFunc = progress => {
      progressElm.style.width = progress * 100 + '%';
    };

    V.ael(encodBtnElm, 'click', async () => {
      V.sa(encodBtnElm, 'disabled', 'disabled');
      console.time('encodBtnElm');
      await this.webaudiomodem.encode(encodeInputElm.value);
      console.timeEnd('encodBtnElm');
      encodBtnElm.removeAttribute('disabled');
      progressBarFunc(100);
      setTimeout(() => {
        progressBarFunc(0);
        encodBtnElm.blur();
      }, 5000);
    });
    V.ael(clearBtnElm, 'click', () => {
      encodeInputElm.value = '';
      encodBtnElm.removeAttribute('disabled');
      clearBtnElm.blur();
    });
    this.webaudiomodem.onProgress = progressBarFunc;
    setTimeout(() => {
      progressBarFunc(0);
    });
    func();
  }

  stop() {}

  start() {}

}

class Decoder {
  constructor(webaudiomodem, outputId = 'output', clearId = 'clearBtn', codeId = 'code', recieverSateId = 'reciever-sate') {
    this.webaudiomodem = webaudiomodem;
    this.outputElm = V.gid(outputId);
    this.clearbtnElm = V.gid(clearId);
    this.codeElm = V.gid(codeId);
    this.recieverSateElm = V.gid(recieverSateId);
    V.ael(this.clearbtnElm, 'click', e => {
      this.outputElm.value = '';
      e.target.blur();
    });

    this.webaudiomodem.onOutput = input => {
      // console.log(this.outputElm.value + input);
      this.outputElm.value += B64Util.u8aToUtf8(input);
    };

    this.webaudiomodem.onTrace = text => {
      this.codeElm.textContent = text;
    }; // this.webaudiomodem.decodeStop();


    this.webaudiomodem.onStateChange = state => {
      this.recieverSateElm = state;
    };
  }

  stop() {
    this.webaudiomodem.decodeStop();
  }

  start() {
    this.webaudiomodem.decodeStart();
  }

}

class WebAudioModem {
  constructor(tabIds) {
    this.map = {};

    this.map[tabIds[0]] = () => {
      return this.encoder;
    };

    this.map[tabIds[1]] = () => {
      return this.decoder;
    };

    this.bufferdwebaudiomodem = new bufferdwebaudiomodem();

    this.onProgress = () => {};

    this.onOutput = () => {};

    this.pauseDurationElm = V.gid('pause-duration');
    this.activeDurationElm = V.gid('active-duration');
    this.binVlueThresholdElm = V.gid('bin-value-threshold');
    this.spanDurationElm = V.gid('span-duration');
    this.unsherpMaskGainElm = V.gid('unsherp-mask-gain');
    this.isUseRSElm = V.gid('is-use-rs');
    this.ecrResioElm = V.gid('error-correct-reduntant-retio');
    this.bitNumElm = V.gid('bit-num');
    this.isUseCCElm = V.gid('is-use-cc');
    this.ccRateElm = V.gid('cc-rate');
  }

  buildConf() {
    const bitNum = this.bitNumElm.value;
    const errorCrrectionReduntantRetio = this.ecrResioElm.value / 100;
    const presetName = 'ByteAs' + bitNum + 'bit';
    const isUseRS = this.isUseRSElm.value;
    const isUseCC = this.isUseCCElm.value;
    const ccRate = this.ccRateElm.value * 1;
    const activeDuration = this.activeDurationElm.value * 1;
    const pauseDuration = this.pauseDurationElm.value * 1;
    const binVlueThreshold = this.binVlueThresholdElm.value * 1;
    const spanDuration = this.spanDurationElm.value * 1;
    const unsherpMaskGain = this.unsherpMaskGainElm.value * 1;
    return {
      isUseRS,
      errorCrrectionReduntantRetio,
      presetName,
      isUseCC,
      ccRate,
      activeDuration,
      pauseDuration,
      binVlueThreshold,
      spanDuration,
      unsherpMaskGain
    };
  }

  init() {
    this.bufferdwebaudiomodem.init(this.buildConf());
    this.msPerByte = this.bufferdwebaudiomodem.msPerByte;
    this.correctRate = this.bufferdwebaudiomodem.correctRate;
  }

  async encode(input, onEncodeProgress = this.onProgress) {
    this.init();
    const u8a = B64Util.s2u8a(input);
    this.bufferdwebaudiomodem.setOnEncodeProgress(onEncodeProgress);
    await this.bufferdwebaudiomodem.encode(u8a);
  }

  decodeStart(onDecoded = this.onOutput) {
    this.init();
    this.bufferdwebaudiomodem.setOnDecoded(onDecoded);
    this.bufferdwebaudiomodem.decodeStart();
  }

  decodeStop() {
    this.bufferdwebaudiomodem.decodeStop();
  }

  buildDecoder(outputId, clearId, codeId) {
    this.decoder = new Decoder(this, outputId, clearId, codeId);
  }

  buildEncoder(encodBtnId, clearBtnId, encodeInputId, progressId) {
    this.encoder = new index_Encoder(this, encodBtnId, clearBtnId, encodeInputId, progressId);
    const func = this.encoder.calcSecFunc;
    V.ael(this.pauseDurationElm, 'change', func);
    V.ael(this.activeDurationElm, 'change', func);
    V.ael(this.isUseRSElm, 'change', func);
    V.ael(this.ecrResioElm, 'change', func);
    V.ael(this.bitNumElm, 'change', func);
    V.ael(this.isUseCCElm, 'change', func);
    V.ael(this.ccRateElm, 'change', func);
  }

  switchView(tabId) {
    for (const [key, value] of Object.entries(this.map)) {
      if (key === tabId) {
        value().start();
      } else {
        value().stop();
      }
    }
  }

}
class WebAudioModemView {
  constructor(tabIds, wam) {
    for (let tabId of tabIds) {
      V.ael(tabId, 'click', this.showTab(tabId, tabIds));
    }

    this.wam = wam;
  }

  showTab(selectTabId, tabIds) {
    const suffix = '-body';
    const tabIdsWithSuffix = [];

    for (let tabId of tabIds) {
      tabIdsWithSuffix.push(tabId + suffix);
    }

    return () => {
      this.showTabExec(selectTabId, tabIds);
      this.showTabExec(selectTabId + suffix, tabIdsWithSuffix);
      this.wam.switchView(selectTabId);
    };
  }

  showTabExec(selectTabId, tabIds, prefixis = ['']) {
    for (let prefix of prefixis) {
      const cn = prefix + 'selected';

      for (let tabId of tabIds) {
        if (tabId === selectTabId) {
          continue;
        }

        const elm = V.gid(tabId);

        if (elm.classList.contains(cn)) {
          elm.classList.remove(cn);
        }
      }

      const elmSelected = V.gid(selectTabId);
      elmSelected.classList.add(cn);
    }
  }

}
const tabIds = ['encoder', 'decoder'];
const wam = new WebAudioModem(tabIds);
new WebAudioModemView(tabIds, wam);
const outputId = 'decoder-output';
const clearId = 'decode-clear';
const codeId = 'decode-code';
wam.buildDecoder(outputId, clearId, codeId);
const encodBtnId = 'encode-action';
const encodeInputId = 'encode-input';
const clearBtnId = 'encode-clear';
const progressId = 'progress';
wam.buildEncoder(encodBtnId, clearBtnId, encodeInputId, progressId);
/******/ })()
;
//# sourceMappingURL=bundle.js.map