import { V } from './util/V.js';
import { B64Util } from 'b64util.es/b64util.js';
import { bufferdwebaudiomodem } from './bufferdwebaudiomodem.js';

V.init();
class Encoder {
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
		const progressBarFunc = (progress) => {
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
		V.ael(this.clearbtnElm, 'click', (e) => {
			this.outputElm.value = '';
			e.target.blur();
		});
		this.webaudiomodem.onOutput = (input) => {
			// console.log(this.outputElm.value + input);
			this.outputElm.value += B64Util.u8aToUtf8(input);
		};
		this.webaudiomodem.onTrace = (text) => {
			this.codeElm.textContent = text;
		};
		// this.webaudiomodem.decodeStop();
		this.webaudiomodem.onStateChange = (state) => {
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

export class WebAudioModem {
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
		return { isUseRS, errorCrrectionReduntantRetio, presetName, isUseCC, ccRate, activeDuration, pauseDuration, binVlueThreshold, spanDuration, unsherpMaskGain };
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
		this.encoder = new Encoder(this, encodBtnId, clearBtnId, encodeInputId, progressId);
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
export class WebAudioModemView {
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
