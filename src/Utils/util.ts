export default class Util {
    statusCode: number;
    data: any;
    
    constructor() {
      this.statusCode = null;
      this.data = null;
    }
    
    sendResponse(statusCode, data , res) {
      this.statusCode = statusCode;
      this.data = data;
      return res.status(this.statusCode).send(data);
    }
    
  }