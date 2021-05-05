import { Oscillator, Reciver } from 'webaudio-modem';
import { ReedSolomonES } from 'reedsolomon.es';
import { CodifEsempioLibro540, ConvolutionalCode, BitLength2 } from 'convolutionalcode.es';
const defaultConf = {
	activeDuration: 40,
	pauseDuration: 0,
	binVlueThreshold: 200,
	spanDuration: 40,
	unsherpMaskGain: 2,
};
export const RSByteLength = ['ByteAs4bit', 'ByteAs6bit', 'ByteAs8bit', 'ByteAs10bit', 'ByteAs12bit', 'ByteAs14bit', 'ByteAs16bit'];
export class bufferdwebaudiomodem {
	constructor(condition) {
		//
		this.init(condition);
		this.oscillator = null;
		this.reciver = null;
		this.msPerByte = 2;
		this.onEncodeProgress = (progress) => {
			console.log(progress);
		};
		this.onStateChange = (state) => {
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
		this.correctRate = (this.isUseRS * 1 === 1 ? 1 + this.errorCrrectionReduntantRetio * 2 : 1) * (this.isUseCC * 1 === 1 ? (this.ccRate === BitLength2 ? 2 : 3) : 1);
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
		const func = async (resolve) => {
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
		this.reciver.onOutput = (u8a) => {
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
