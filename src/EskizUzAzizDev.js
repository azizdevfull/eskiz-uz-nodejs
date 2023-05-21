const dotenv = require('dotenv');

dotenv.config();

const SUCCESS = 200;
const PROCESSING = 102;
const FAILED = 400;
const INVALID_NUMBER = 160;
const MESSAGE_IS_EMPTY = 170;
const SMS_NOT_FOUND = 404;
const SMS_SERVICE_NOT_TURNED = 600;

const ESKIZ_EMAIL = process.env.ESKIZ_EMAIL;
const ESKIZ_PASSWORD = process.env.ESKIZ_PASSWORD;

class EskizUzAzizDev {
  constructor(message, phone, email, password ) {
    this.message = message;
    this.phone = phone;
    this.spend = null;
    this.email = email;
    this.password = password;
  }

  async send() {
    const statusCode = this.customValidation();
    if (statusCode !== SUCCESS) {
      return statusCode;
    }

    const result = await this.calculationSendSms(this.message);
    return result === SUCCESS ? this.sendMessage(this.message) : result;
  }

  customValidation() {
    if (this.phone.toString().length !== 9) {
      return INVALID_NUMBER;
    }
    if (!this.message || this.message.trim().length === 0) {
      return MESSAGE_IS_EMPTY;
    }

    this.message = this.cleanMessage(this.message);
    return SUCCESS;
  }

  async authorization() {
    const uri = 'http://notify.eskiz.uz/api/auth/login';
    const data = { email: this.email, password: this.password };
    const res = await fetch(uri, {
      method: 'POST',
      body: new URLSearchParams(data),
    });
    const resJson = await res.json();

    if (!resJson.data || !resJson.data.token) {
      return FAILED;
    }

    return resJson.data.token;
  }

  async sendMessage(message) {
    const token = await this.authorization();
    if (token === FAILED) {
      return FAILED;
    }

    const uri = 'http://notify.eskiz.uz/api/message/sms/send';
    const payload = {
      mobile_phone: '998' + this.phone.toString(),
      message,
      from: '4546',
      callback_url: 'http://afbaf9e5a0a6.ngrok.io/sms-api-result/',
    };

    const headers = { Authorization: `Bearer ${token}` };
    const res = await fetch(uri, {
      method: 'POST',
      headers,
      body: new URLSearchParams(payload),
    });

    const resJson = await res.json();
    console.log(`Eskiz: ${JSON.stringify(resJson)}`);
    return res.status;
  }

  async getStatus(id) {
    const token = await this.authorization();

    const uri = `http://notify.eskiz.uz/api/message/sms/status/${id}`;
    const headers = { Authorization: `Bearer ${token}` };
    const res = await fetch(uri, { headers });
    const resJson = await res.json();

    if (resJson.status === 'success') {
      if (['DELIVRD', 'TRANSMTD'].includes(resJson.message.status)) {
        return SUCCESS;
      } else if (resJson.message.status === 'EXPIRED') {
        return FAILED;
      } else {
        return PROCESSING;
      }
    } else {
      return FAILED;
    }
  }

  cleanMessage(message) {
    console.log(`Old message: ${message}`);
    return message
      .replace(/ц/g, 'ts')
      .replace(/ч/g, 'ch')
      .replace(/ю/g, 'yu')
      .replace(/а/g, 'a')
      .replace(/б/g, 'b')
      .replace(/қ/g, 'q')
      .replace(/ў/g, "o'")
      .replace(/ғ/g, "g'")
      .replace(/ҳ/g, 'h')
      .replace(/х/g, 'x')
      .replace(/в/g, 'v')
      .replace(/г/g, 'g')
      .replace(/д/g, 'd')
      .replace(/е/g, 'e')
      .replace(/ё/g, 'yo')
      .replace(/ж/g, 'j')
      .replace(/з/g, 'z')
      .replace(/и/g, 'i')
      .replace(/й/g, 'y')
      .replace(/к/g, 'k')
      .replace(/л/g, 'l')
      .replace(/м/g, 'm')
      .replace(/н/g, 'n')
      .replace(/о/g, 'o')
      .replace(/п/g, 'p')
      .replace(/р/g, 'r')
      .replace(/с/g, 's')
      .replace(/т/g, 't')
      .replace(/у/g, 'u')
      .replace(/ф/g, 'f')
      .replace(/ҳ/g, 'h')
      .replace(/ҷ/g, 'j')
      .replace(/ш/g, 'sh')
      .replace(/Я/g, 'YA')
      .replace(/а/g, 'a')
      .replace(/б/g, 'b')
      .replace(/в/g, 'v')
      .replace(/г/g, 'g')
      .replace(/д/g, 'd')
      .replace(/е/g, 'e')
      .replace(/ё/g, 'yo')
      .replace(/ж/g, 'j')
      .replace(/з/g, 'z')
      .replace(/и/g, 'i')
      .replace(/й/g, 'y')
      .replace(/к/g, 'k')
      .replace(/л/g, 'l')
      .replace(/м/g, 'm')
      .replace(/н/g, 'n')
      .replace(/о/g, 'o')
      .replace(/п/g, 'p')
      .replace(/р/g, 'r')
      .replace(/с/g, 's')
      .replace(/т/g, 't')
      .replace(/у/g, 'u')
      .replace(/ф/g, 'f')
      .replace(/х/g, 'h')
      .replace(/ц/g, 'ts')
      .replace(/ч/g, 'ch')
      .replace(/ш/g, 'sh')
      .replace(/щ/g, 'sch')
      .replace(/ъ/g, '')
      .replace(/ь/g, '')
      .replace(/ы/g, 'y')
      .replace(/э/g, 'e')
      .replace(/ю/g, 'yu')
      .replace(/я/g, 'ya')
      .replace(/А/g, 'A')
      .replace(/Б/g, 'B')
      .replace(/В/g, 'V')
      .replace(/Г/g, 'G')
      .replace(/Д/g, 'D')
      .replace(/Е/g, 'E')
      .replace(/Ё/g, 'YO')
      .replace(/Ж/g, 'J')
      .replace(/З/g, 'Z')
      .replace(/И/g, 'I')
      .replace(/Й/g, 'Y')
      .replace(/К/g, 'K')
      .replace(/Л/g, 'L')
      .replace(/М/g, 'M')
      .replace(/Н/g, 'N')
      .replace(/О/g, 'O')
      .replace(/П/g, 'P')
      .replace(/Р/g, 'R')
      .replace(/С/g, 'S')
      .replace(/Т/g, 'T')
      .replace(/У/g, 'U')
      .replace(/Ф/g, 'F')
      .replace(/Х/g, 'H')
      .replace(/Ц/g, 'TS')
      .replace(/Ч/g, 'CH')
      .replace(/Ш/g, 'SH')
      .replace(/Щ/g, 'SCH')
      .replace(/Ъ/g, '')
      .replace(/Ь/g, '')
      .replace(/Ы/g, 'Y')
      .replace(/Э/g, 'E')
      .replace(/Ю/g, 'YU')
      .replace(/Я/g, 'YA');
  }

  calculationSendSms(message) {
    let messageLength = message.length;
    if (messageLength > 70) {
      messageLength += 13;
    }
    this.spend = messageLength * 80; // price per 1 character in Uzbek sum
    return SUCCESS;
  }
}

module.exports = EskizUzAzizDev;