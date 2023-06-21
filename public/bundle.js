(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i5 = 0, len = code.length; i5 < len; ++i5) {
        lookup[i5] = code[i5];
        revLookup[code.charCodeAt(i5)] = i5;
      }
      var i5;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1)
          validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i6;
        for (i6 = 0; i6 < len2; i6 += 4) {
          tmp = revLookup[b64.charCodeAt(i6)] << 18 | revLookup[b64.charCodeAt(i6 + 1)] << 12 | revLookup[b64.charCodeAt(i6 + 2)] << 6 | revLookup[b64.charCodeAt(i6 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i6)] << 2 | revLookup[b64.charCodeAt(i6 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i6)] << 10 | revLookup[b64.charCodeAt(i6 + 1)] << 4 | revLookup[b64.charCodeAt(i6 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i6 = start; i6 < end; i6 += 3) {
          tmp = (uint8[i6] << 16 & 16711680) + (uint8[i6 + 1] << 8 & 65280) + (uint8[i6 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i6 = 0, len22 = len2 - extraBytes; i6 < len22; i6 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i6, i6 + maxChunkLength > len22 ? len22 : i6 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e4, m3;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i5 = isLE ? nBytes - 1 : 0;
        var d5 = isLE ? -1 : 1;
        var s5 = buffer[offset + i5];
        i5 += d5;
        e4 = s5 & (1 << -nBits) - 1;
        s5 >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e4 = e4 * 256 + buffer[offset + i5], i5 += d5, nBits -= 8) {
        }
        m3 = e4 & (1 << -nBits) - 1;
        e4 >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m3 = m3 * 256 + buffer[offset + i5], i5 += d5, nBits -= 8) {
        }
        if (e4 === 0) {
          e4 = 1 - eBias;
        } else if (e4 === eMax) {
          return m3 ? NaN : (s5 ? -1 : 1) * Infinity;
        } else {
          m3 = m3 + Math.pow(2, mLen);
          e4 = e4 - eBias;
        }
        return (s5 ? -1 : 1) * m3 * Math.pow(2, e4 - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e4, m3, c6;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i5 = isLE ? 0 : nBytes - 1;
        var d5 = isLE ? 1 : -1;
        var s5 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m3 = isNaN(value) ? 1 : 0;
          e4 = eMax;
        } else {
          e4 = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c6 = Math.pow(2, -e4)) < 1) {
            e4--;
            c6 *= 2;
          }
          if (e4 + eBias >= 1) {
            value += rt / c6;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c6 >= 2) {
            e4++;
            c6 /= 2;
          }
          if (e4 + eBias >= eMax) {
            m3 = 0;
            e4 = eMax;
          } else if (e4 + eBias >= 1) {
            m3 = (value * c6 - 1) * Math.pow(2, mLen);
            e4 = e4 + eBias;
          } else {
            m3 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e4 = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i5] = m3 & 255, i5 += d5, m3 /= 256, mLen -= 8) {
        }
        e4 = e4 << mLen | m3;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i5] = e4 & 255, i5 += d5, e4 /= 256, eLen -= 8) {
        }
        buffer[offset + i5 - d5] |= s5 * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports) {
      "use strict";
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer3;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e4) {
          return false;
        }
      }
      Object.defineProperty(Buffer3.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this))
            return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer3.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this))
            return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function Buffer3(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer3.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer3.from(valueOf, encodingOrOffset, length);
        }
        const b4 = fromObject(value);
        if (b4)
          return b4;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer3.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer3, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer3.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer3.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer3.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i5 = 0; i5 < length; i5 += 1) {
          buf[i5] = array[i5] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer3.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer3.alloc(+length);
      }
      Buffer3.isBuffer = function isBuffer(b4) {
        return b4 != null && b4._isBuffer === true && b4 !== Buffer3.prototype;
      };
      Buffer3.compare = function compare(a5, b4) {
        if (isInstance(a5, Uint8Array))
          a5 = Buffer3.from(a5, a5.offset, a5.byteLength);
        if (isInstance(b4, Uint8Array))
          b4 = Buffer3.from(b4, b4.offset, b4.byteLength);
        if (!Buffer3.isBuffer(a5) || !Buffer3.isBuffer(b4)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a5 === b4)
          return 0;
        let x2 = a5.length;
        let y3 = b4.length;
        for (let i5 = 0, len = Math.min(x2, y3); i5 < len; ++i5) {
          if (a5[i5] !== b4[i5]) {
            x2 = a5[i5];
            y3 = b4[i5];
            break;
          }
        }
        if (x2 < y3)
          return -1;
        if (y3 < x2)
          return 1;
        return 0;
      };
      Buffer3.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer3.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer3.alloc(0);
        }
        let i5;
        if (length === void 0) {
          length = 0;
          for (i5 = 0; i5 < list.length; ++i5) {
            length += list[i5].length;
          }
        }
        const buffer = Buffer3.allocUnsafe(length);
        let pos = 0;
        for (i5 = 0; i5 < list.length; ++i5) {
          let buf = list[i5];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer3.isBuffer(buf))
                buf = Buffer3.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer3.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer3.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0)
          return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding)
          encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.prototype._isBuffer = true;
      function swap(b4, n3, m3) {
        const i5 = b4[n3];
        b4[n3] = b4[m3];
        b4[m3] = i5;
      }
      Buffer3.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i5 = 0; i5 < len; i5 += 2) {
          swap(this, i5, i5 + 1);
        }
        return this;
      };
      Buffer3.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i5 = 0; i5 < len; i5 += 4) {
          swap(this, i5, i5 + 3);
          swap(this, i5 + 1, i5 + 2);
        }
        return this;
      };
      Buffer3.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i5 = 0; i5 < len; i5 += 8) {
          swap(this, i5, i5 + 7);
          swap(this, i5 + 1, i5 + 6);
          swap(this, i5 + 2, i5 + 5);
          swap(this, i5 + 3, i5 + 4);
        }
        return this;
      };
      Buffer3.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0)
          return "";
        if (arguments.length === 0)
          return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
      Buffer3.prototype.equals = function equals(b4) {
        if (!Buffer3.isBuffer(b4))
          throw new TypeError("Argument must be a Buffer");
        if (this === b4)
          return true;
        return Buffer3.compare(this, b4) === 0;
      };
      Buffer3.prototype.inspect = function inspect() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max)
          str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
      }
      Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer3.from(target, target.offset, target.byteLength);
        }
        if (!Buffer3.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target)
          return 0;
        let x2 = thisEnd - thisStart;
        let y3 = end - start;
        const len = Math.min(x2, y3);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i5 = 0; i5 < len; ++i5) {
          if (thisCopy[i5] !== targetCopy[i5]) {
            x2 = thisCopy[i5];
            y3 = targetCopy[i5];
            break;
          }
        }
        if (x2 < y3)
          return -1;
        if (y3 < x2)
          return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0)
          return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0)
          byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir)
            return -1;
          else
            byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir)
            byteOffset = 0;
          else
            return -1;
        }
        if (typeof val === "string") {
          val = Buffer3.from(val, encoding);
        }
        if (Buffer3.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i6) {
          if (indexSize === 1) {
            return buf[i6];
          } else {
            return buf.readUInt16BE(i6 * indexSize);
          }
        }
        let i5;
        if (dir) {
          let foundIndex = -1;
          for (i5 = byteOffset; i5 < arrLength; i5++) {
            if (read(arr, i5) === read(val, foundIndex === -1 ? 0 : i5 - foundIndex)) {
              if (foundIndex === -1)
                foundIndex = i5;
              if (i5 - foundIndex + 1 === valLength)
                return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1)
                i5 -= i5 - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength)
            byteOffset = arrLength - valLength;
          for (i5 = byteOffset; i5 >= 0; i5--) {
            let found = true;
            for (let j3 = 0; j3 < valLength; j3++) {
              if (read(arr, i5 + j3) !== read(val, j3)) {
                found = false;
                break;
              }
            }
            if (found)
              return i5;
          }
        }
        return -1;
      }
      Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i5;
        for (i5 = 0; i5 < length; ++i5) {
          const parsed = parseInt(string.substr(i5 * 2, 2), 16);
          if (numberIsNaN(parsed))
            return i5;
          buf[offset + i5] = parsed;
        }
        return i5;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer3.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0)
              encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining)
          length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding)
          encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer3.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i5 = start;
        while (i5 < end) {
          const firstByte = buf[i5];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i5 + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i5 + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i5 + 1];
                thirdByte = buf[i5 + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i5 + 1];
                thirdByte = buf[i5 + 2];
                fourthByte = buf[i5 + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i5 += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i5 = 0;
        while (i5 < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i5, i5 += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i5 = start; i5 < end; ++i5) {
          ret += String.fromCharCode(buf[i5] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i5 = start; i5 < end; ++i5) {
          ret += String.fromCharCode(buf[i5]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0)
          start = 0;
        if (!end || end < 0 || end > len)
          end = len;
        let out = "";
        for (let i5 = start; i5 < end; ++i5) {
          out += hexSliceLookupTable[buf[i5]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i5 = 0; i5 < bytes.length - 1; i5 += 2) {
          res += String.fromCharCode(bytes[i5] + bytes[i5 + 1] * 256);
        }
        return res;
      }
      Buffer3.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0)
            start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0)
            end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start)
          end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer3.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0)
          throw new RangeError("offset is not uint");
        if (offset + ext > length)
          throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i5 = 0;
        while (++i5 < byteLength2 && (mul *= 256)) {
          val += this[offset + i5] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i5 = 0;
        while (++i5 < byteLength2 && (mul *= 256)) {
          val += this[offset + i5] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        let i5 = byteLength2;
        let mul = 1;
        let val = this[offset + --i5];
        while (i5 > 0 && (mul *= 256)) {
          val += this[offset + --i5] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128))
          return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer3.isBuffer(buf))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min)
          throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
      }
      Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i5 = 0;
        this[offset] = value & 255;
        while (++i5 < byteLength2 && (mul *= 256)) {
          this[offset + i5] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i5 = byteLength2 - 1;
        let mul = 1;
        this[offset + i5] = value & 255;
        while (--i5 >= 0 && (mul *= 256)) {
          this[offset + i5] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i5 = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i5 < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i5 - 1] !== 0) {
            sub = 1;
          }
          this[offset + i5] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i5 = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i5] = value & 255;
        while (--i5 >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i5 + 1] !== 0) {
            sub = 1;
          }
          this[offset + i5] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 127, -128);
        if (value < 0)
          value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0)
          value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
        if (offset < 0)
          throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer3.isBuffer(target))
          throw new TypeError("argument should be a Buffer");
        if (!start)
          start = 0;
        if (!end && end !== 0)
          end = this.length;
        if (targetStart >= target.length)
          targetStart = target.length;
        if (!targetStart)
          targetStart = 0;
        if (end > 0 && end < start)
          end = start;
        if (end === start)
          return 0;
        if (target.length === 0 || this.length === 0)
          return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length)
          throw new RangeError("Index out of range");
        if (end < 0)
          throw new RangeError("sourceEnd out of bounds");
        if (end > this.length)
          end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer3.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val)
          val = 0;
        let i5;
        if (typeof val === "number") {
          for (i5 = start; i5 < end; ++i5) {
            this[i5] = val;
          }
        } else {
          const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i5 = 0; i5 < end - start; ++i5) {
            this[i5 + start] = bytes[i5 % len];
          }
        }
        return this;
      };
      var errors = {};
      function E2(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E2(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E2(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E2(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i5 = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i5 >= start + 4; i5 -= 3) {
          res = `_${val.slice(i5 - 3, i5)}${res}`;
        }
        return `${val.slice(0, i5)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n3 = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n3} and < 2${n3} ** ${(byteLength2 + 1) * 8}${n3}`;
            } else {
              range = `>= -(2${n3} ** ${(byteLength2 + 1) * 8 - 1}${n3}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n3}`;
            }
          } else {
            range = `>= ${min}${n3} and <= ${max}${n3}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          `>= ${type ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2)
          return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i5 = 0; i5 < length; ++i5) {
          codePoint = string.charCodeAt(i5);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              } else if (i5 + 1 === length) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0)
              break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0)
              break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0)
              break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0)
              break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i5 = 0; i5 < str.length; ++i5) {
          byteArray.push(str.charCodeAt(i5) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c6, hi, lo;
        const byteArray = [];
        for (let i5 = 0; i5 < str.length; ++i5) {
          if ((units -= 2) < 0)
            break;
          c6 = str.charCodeAt(i5);
          hi = c6 >> 8;
          lo = c6 % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i5;
        for (i5 = 0; i5 < length; ++i5) {
          if (i5 + offset >= dst.length || i5 >= src.length)
            break;
          dst[i5 + offset] = src[i5];
        }
        return i5;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i5 = 0; i5 < 16; ++i5) {
          const i16 = i5 * 16;
          for (let j3 = 0; j3 < 16; ++j3) {
            table[i16 + j3] = alphabet[i5] + alphabet[j3];
          }
        }
        return table;
      }();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // node_modules/mersenne-twister/src/mersenne-twister.js
  var require_mersenne_twister = __commonJS({
    "node_modules/mersenne-twister/src/mersenne-twister.js"(exports, module) {
      var MersenneTwister = function(seed) {
        if (seed == void 0) {
          seed = (/* @__PURE__ */ new Date()).getTime();
        }
        this.N = 624;
        this.M = 397;
        this.MATRIX_A = 2567483615;
        this.UPPER_MASK = 2147483648;
        this.LOWER_MASK = 2147483647;
        this.mt = new Array(this.N);
        this.mti = this.N + 1;
        if (seed.constructor == Array) {
          this.init_by_array(seed, seed.length);
        } else {
          this.init_seed(seed);
        }
      };
      MersenneTwister.prototype.init_seed = function(s5) {
        this.mt[0] = s5 >>> 0;
        for (this.mti = 1; this.mti < this.N; this.mti++) {
          var s5 = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
          this.mt[this.mti] = (((s5 & 4294901760) >>> 16) * 1812433253 << 16) + (s5 & 65535) * 1812433253 + this.mti;
          this.mt[this.mti] >>>= 0;
        }
      };
      MersenneTwister.prototype.init_by_array = function(init_key, key_length) {
        var i5, j3, k3;
        this.init_seed(19650218);
        i5 = 1;
        j3 = 0;
        k3 = this.N > key_length ? this.N : key_length;
        for (; k3; k3--) {
          var s5 = this.mt[i5 - 1] ^ this.mt[i5 - 1] >>> 30;
          this.mt[i5] = (this.mt[i5] ^ (((s5 & 4294901760) >>> 16) * 1664525 << 16) + (s5 & 65535) * 1664525) + init_key[j3] + j3;
          this.mt[i5] >>>= 0;
          i5++;
          j3++;
          if (i5 >= this.N) {
            this.mt[0] = this.mt[this.N - 1];
            i5 = 1;
          }
          if (j3 >= key_length)
            j3 = 0;
        }
        for (k3 = this.N - 1; k3; k3--) {
          var s5 = this.mt[i5 - 1] ^ this.mt[i5 - 1] >>> 30;
          this.mt[i5] = (this.mt[i5] ^ (((s5 & 4294901760) >>> 16) * 1566083941 << 16) + (s5 & 65535) * 1566083941) - i5;
          this.mt[i5] >>>= 0;
          i5++;
          if (i5 >= this.N) {
            this.mt[0] = this.mt[this.N - 1];
            i5 = 1;
          }
        }
        this.mt[0] = 2147483648;
      };
      MersenneTwister.prototype.random_int = function() {
        var y3;
        var mag01 = new Array(0, this.MATRIX_A);
        if (this.mti >= this.N) {
          var kk;
          if (this.mti == this.N + 1)
            this.init_seed(5489);
          for (kk = 0; kk < this.N - this.M; kk++) {
            y3 = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
            this.mt[kk] = this.mt[kk + this.M] ^ y3 >>> 1 ^ mag01[y3 & 1];
          }
          for (; kk < this.N - 1; kk++) {
            y3 = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
            this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ y3 >>> 1 ^ mag01[y3 & 1];
          }
          y3 = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK;
          this.mt[this.N - 1] = this.mt[this.M - 1] ^ y3 >>> 1 ^ mag01[y3 & 1];
          this.mti = 0;
        }
        y3 = this.mt[this.mti++];
        y3 ^= y3 >>> 11;
        y3 ^= y3 << 7 & 2636928640;
        y3 ^= y3 << 15 & 4022730752;
        y3 ^= y3 >>> 18;
        return y3 >>> 0;
      };
      MersenneTwister.prototype.random_int31 = function() {
        return this.random_int() >>> 1;
      };
      MersenneTwister.prototype.random_incl = function() {
        return this.random_int() * (1 / 4294967295);
      };
      MersenneTwister.prototype.random = function() {
        return this.random_int() * (1 / 4294967296);
      };
      MersenneTwister.prototype.random_excl = function() {
        return (this.random_int() + 0.5) * (1 / 4294967296);
      };
      MersenneTwister.prototype.random_long = function() {
        var a5 = this.random_int() >>> 5, b4 = this.random_int() >>> 6;
        return (a5 * 67108864 + b4) * (1 / 9007199254740992);
      };
      module.exports = MersenneTwister;
    }
  });

  // node_modules/raphael/raphael.min.js
  var require_raphael_min = __commonJS({
    "node_modules/raphael/raphael.min.js"(exports, module) {
      !function(t4, e4) {
        "object" == typeof exports && "object" == typeof module ? module.exports = e4() : "function" == typeof define && define.amd ? define([], e4) : "object" == typeof exports ? exports.Raphael = e4() : t4.Raphael = e4();
      }(window, function() {
        return function(t4) {
          var e4 = {};
          function r5(i5) {
            if (e4[i5])
              return e4[i5].exports;
            var n3 = e4[i5] = { i: i5, l: false, exports: {} };
            return t4[i5].call(n3.exports, n3, n3.exports, r5), n3.l = true, n3.exports;
          }
          return r5.m = t4, r5.c = e4, r5.d = function(t5, e5, i5) {
            r5.o(t5, e5) || Object.defineProperty(t5, e5, { enumerable: true, get: i5 });
          }, r5.r = function(t5) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t5, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t5, "__esModule", { value: true });
          }, r5.t = function(t5, e5) {
            if (1 & e5 && (t5 = r5(t5)), 8 & e5)
              return t5;
            if (4 & e5 && "object" == typeof t5 && t5 && t5.__esModule)
              return t5;
            var i5 = /* @__PURE__ */ Object.create(null);
            if (r5.r(i5), Object.defineProperty(i5, "default", { enumerable: true, value: t5 }), 2 & e5 && "string" != typeof t5)
              for (var n3 in t5)
                r5.d(i5, n3, function(e6) {
                  return t5[e6];
                }.bind(null, n3));
            return i5;
          }, r5.n = function(t5) {
            var e5 = t5 && t5.__esModule ? function() {
              return t5.default;
            } : function() {
              return t5;
            };
            return r5.d(e5, "a", e5), e5;
          }, r5.o = function(t5, e5) {
            return Object.prototype.hasOwnProperty.call(t5, e5);
          }, r5.p = "", r5(r5.s = 1);
        }([function(t4, e4, r5) {
          var i5, n3;
          i5 = [r5(2)], void 0 === (n3 = function(t5) {
            function e5(i7) {
              if (e5.is(i7, "function"))
                return r6 ? i7() : t5.on("raphael.DOMload", i7);
              if (e5.is(i7, A2))
                return e5._engine.create[c6](e5, i7.splice(0, 3 + e5.is(i7[0], T2))).add(i7);
              var n5 = Array.prototype.slice.call(arguments, 0);
              if (e5.is(n5[n5.length - 1], "function")) {
                var a6 = n5.pop();
                return r6 ? a6.call(e5._engine.create[c6](e5, n5)) : t5.on("raphael.DOMload", function() {
                  a6.call(e5._engine.create[c6](e5, n5));
                });
              }
              return e5._engine.create[c6](e5, arguments);
            }
            e5.version = "2.3.0", e5.eve = t5;
            var r6, i6, n4 = /[, ]+/, a5 = { circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1 }, s5 = /\{(\d+)\}/g, o5 = "hasOwnProperty", l6 = { doc: document, win: window }, h3 = { was: Object.prototype[o5].call(l6.win, "Raphael"), is: l6.win.Raphael }, u5 = function() {
              this.ca = this.customAttributes = {};
            }, c6 = "apply", f4 = "concat", p5 = "ontouchstart" in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch, d5 = "", g4 = " ", x2 = String, v5 = "split", y3 = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[v5](g4), m3 = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }, b4 = x2.prototype.toLowerCase, _4 = Math, w4 = _4.max, k3 = _4.min, B2 = _4.abs, C2 = _4.pow, S = _4.PI, T2 = "number", A2 = "array", M2 = Object.prototype.toString, E2 = (e5._ISURL = /^url\(['"]?(.+?)['"]?\)$/i, /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i), N2 = { NaN: 1, Infinity: 1, "-Infinity": 1 }, L2 = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, P2 = _4.round, z3 = parseFloat, F3 = parseInt, R = x2.prototype.toUpperCase, j3 = e5._availableAttrs = { "arrow-end": "none", "arrow-start": "none", blur: 0, "clip-rect": "0 0 1e9 1e9", cursor: "default", cx: 0, cy: 0, fill: "#fff", "fill-opacity": 1, font: '10px "Arial"', "font-family": '"Arial"', "font-size": "10", "font-style": "normal", "font-weight": 400, gradient: 0, height: 0, href: "http://raphaeljs.com/", "letter-spacing": 0, opacity: 1, path: "M0,0", r: 0, rx: 0, ry: 0, src: "", stroke: "#000", "stroke-dasharray": "", "stroke-linecap": "butt", "stroke-linejoin": "butt", "stroke-miterlimit": 0, "stroke-opacity": 1, "stroke-width": 1, target: "_blank", "text-anchor": "middle", title: "Raphael", transform: "", width: 0, x: 0, y: 0, class: "" }, I2 = e5._availableAnimAttrs = { blur: T2, "clip-rect": "csv", cx: T2, cy: T2, fill: "colour", "fill-opacity": T2, "font-size": T2, height: T2, opacity: T2, path: "path", r: T2, rx: T2, ry: T2, stroke: "colour", "stroke-opacity": T2, "stroke-width": T2, transform: "transform", width: T2, x: T2, y: T2 }, D2 = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/, q2 = { hs: 1, rg: 1 }, O2 = /,?([achlmqrstvxz]),?/gi, V = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, W = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, Y = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi, G = (e5._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, {}), H2 = function(t6, e6) {
              return z3(t6) - z3(e6);
            }, X = function(t6) {
              return t6;
            }, U = e5._rectPath = function(t6, e6, r7, i7, n5) {
              return n5 ? [["M", t6 + n5, e6], ["l", r7 - 2 * n5, 0], ["a", n5, n5, 0, 0, 1, n5, n5], ["l", 0, i7 - 2 * n5], ["a", n5, n5, 0, 0, 1, -n5, n5], ["l", 2 * n5 - r7, 0], ["a", n5, n5, 0, 0, 1, -n5, -n5], ["l", 0, 2 * n5 - i7], ["a", n5, n5, 0, 0, 1, n5, -n5], ["z"]] : [["M", t6, e6], ["l", r7, 0], ["l", 0, i7], ["l", -r7, 0], ["z"]];
            }, $2 = function(t6, e6, r7, i7) {
              return null == i7 && (i7 = r7), [["M", t6, e6], ["m", 0, -i7], ["a", r7, i7, 0, 1, 1, 0, 2 * i7], ["a", r7, i7, 0, 1, 1, 0, -2 * i7], ["z"]];
            }, Z = e5._getPath = { path: function(t6) {
              return t6.attr("path");
            }, circle: function(t6) {
              var e6 = t6.attrs;
              return $2(e6.cx, e6.cy, e6.r);
            }, ellipse: function(t6) {
              var e6 = t6.attrs;
              return $2(e6.cx, e6.cy, e6.rx, e6.ry);
            }, rect: function(t6) {
              var e6 = t6.attrs;
              return U(e6.x, e6.y, e6.width, e6.height, e6.r);
            }, image: function(t6) {
              var e6 = t6.attrs;
              return U(e6.x, e6.y, e6.width, e6.height);
            }, text: function(t6) {
              var e6 = t6._getBBox();
              return U(e6.x, e6.y, e6.width, e6.height);
            }, set: function(t6) {
              var e6 = t6._getBBox();
              return U(e6.x, e6.y, e6.width, e6.height);
            } }, Q = e5.mapPath = function(t6, e6) {
              if (!e6)
                return t6;
              var r7, i7, n5, a6, s6, o6, l7;
              for (n5 = 0, s6 = (t6 = Tt(t6)).length; n5 < s6; n5++)
                for (a6 = 1, o6 = (l7 = t6[n5]).length; a6 < o6; a6 += 2)
                  r7 = e6.x(l7[a6], l7[a6 + 1]), i7 = e6.y(l7[a6], l7[a6 + 1]), l7[a6] = r7, l7[a6 + 1] = i7;
              return t6;
            };
            if (e5._g = l6, e5.type = l6.win.SVGAngle || l6.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", "VML" == e5.type) {
              var J, K = l6.doc.createElement("div");
              if (K.innerHTML = '<v:shape adj="1"/>', (J = K.firstChild).style.behavior = "url(#default#VML)", !J || "object" != typeof J.adj)
                return e5.type = d5;
              K = null;
            }
            function tt(t6) {
              if ("function" == typeof t6 || Object(t6) !== t6)
                return t6;
              var e6 = new t6.constructor();
              for (var r7 in t6)
                t6[o5](r7) && (e6[r7] = tt(t6[r7]));
              return e6;
            }
            e5.svg = !(e5.vml = "VML" == e5.type), e5._Paper = u5, e5.fn = i6 = u5.prototype = e5.prototype, e5._id = 0, e5.is = function(t6, e6) {
              return "finite" == (e6 = b4.call(e6)) ? !N2[o5](+t6) : "array" == e6 ? t6 instanceof Array : "null" == e6 && null === t6 || e6 == typeof t6 && null !== t6 || "object" == e6 && t6 === Object(t6) || "array" == e6 && Array.isArray && Array.isArray(t6) || M2.call(t6).slice(8, -1).toLowerCase() == e6;
            }, e5.angle = function(t6, r7, i7, n5, a6, s6) {
              if (null == a6) {
                var o6 = t6 - i7, l7 = r7 - n5;
                return o6 || l7 ? (180 + 180 * _4.atan2(-l7, -o6) / S + 360) % 360 : 0;
              }
              return e5.angle(t6, r7, a6, s6) - e5.angle(i7, n5, a6, s6);
            }, e5.rad = function(t6) {
              return t6 % 360 * S / 180;
            }, e5.deg = function(t6) {
              return Math.round(180 * t6 / S % 360 * 1e3) / 1e3;
            }, e5.snapTo = function(t6, r7, i7) {
              if (i7 = e5.is(i7, "finite") ? i7 : 10, e5.is(t6, A2)) {
                for (var n5 = t6.length; n5--; )
                  if (B2(t6[n5] - r7) <= i7)
                    return t6[n5];
              } else {
                var a6 = r7 % (t6 = +t6);
                if (a6 < i7)
                  return r7 - a6;
                if (a6 > t6 - i7)
                  return r7 - a6 + t6;
              }
              return r7;
            };
            var et, rt;
            e5.createUUID = (et = /[xy]/g, rt = function(t6) {
              var e6 = 16 * _4.random() | 0;
              return ("x" == t6 ? e6 : 3 & e6 | 8).toString(16);
            }, function() {
              return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(et, rt).toUpperCase();
            });
            e5.setWindow = function(r7) {
              t5("raphael.setWindow", e5, l6.win, r7), l6.win = r7, l6.doc = l6.win.document, e5._engine.initWin && e5._engine.initWin(l6.win);
            };
            var it = function(t6) {
              if (e5.vml) {
                var r7, i7 = /^\s+|\s+$/g;
                try {
                  var n5 = new ActiveXObject("htmlfile");
                  n5.write("<body>"), n5.close(), r7 = n5.body;
                } catch (t7) {
                  r7 = createPopup().document.body;
                }
                var a6 = r7.createTextRange();
                it = ht(function(t7) {
                  try {
                    r7.style.color = x2(t7).replace(i7, d5);
                    var e6 = a6.queryCommandValue("ForeColor");
                    return "#" + ("000000" + (e6 = (255 & e6) << 16 | 65280 & e6 | (16711680 & e6) >>> 16).toString(16)).slice(-6);
                  } catch (t8) {
                    return "none";
                  }
                });
              } else {
                var s6 = l6.doc.createElement("i");
                s6.title = "Rapha\xEBl Colour Picker", s6.style.display = "none", l6.doc.body.appendChild(s6), it = ht(function(t7) {
                  return s6.style.color = t7, l6.doc.defaultView.getComputedStyle(s6, d5).getPropertyValue("color");
                });
              }
              return it(t6);
            }, nt = function() {
              return "hsb(" + [this.h, this.s, this.b] + ")";
            }, at = function() {
              return "hsl(" + [this.h, this.s, this.l] + ")";
            }, st = function() {
              return this.hex;
            }, ot = function(t6, r7, i7) {
              if (null == r7 && e5.is(t6, "object") && "r" in t6 && "g" in t6 && "b" in t6 && (i7 = t6.b, r7 = t6.g, t6 = t6.r), null == r7 && e5.is(t6, "string")) {
                var n5 = e5.getRGB(t6);
                t6 = n5.r, r7 = n5.g, i7 = n5.b;
              }
              return (t6 > 1 || r7 > 1 || i7 > 1) && (t6 /= 255, r7 /= 255, i7 /= 255), [t6, r7, i7];
            }, lt = function(t6, r7, i7, n5) {
              var a6 = { r: t6 *= 255, g: r7 *= 255, b: i7 *= 255, hex: e5.rgb(t6, r7, i7), toString: st };
              return e5.is(n5, "finite") && (a6.opacity = n5), a6;
            };
            function ht(t6, e6, r7) {
              return function i7() {
                var n5 = Array.prototype.slice.call(arguments, 0), a6 = n5.join("\u2400"), s6 = i7.cache = i7.cache || {}, l7 = i7.count = i7.count || [];
                return s6[o5](a6) ? (function(t7, e7) {
                  for (var r8 = 0, i8 = t7.length; r8 < i8; r8++)
                    if (t7[r8] === e7)
                      return t7.push(t7.splice(r8, 1)[0]);
                }(l7, a6), r7 ? r7(s6[a6]) : s6[a6]) : (l7.length >= 1e3 && delete s6[l7.shift()], l7.push(a6), s6[a6] = t6[c6](e6, n5), r7 ? r7(s6[a6]) : s6[a6]);
              };
            }
            e5.color = function(t6) {
              var r7;
              return e5.is(t6, "object") && "h" in t6 && "s" in t6 && "b" in t6 ? (r7 = e5.hsb2rgb(t6), t6.r = r7.r, t6.g = r7.g, t6.b = r7.b, t6.hex = r7.hex) : e5.is(t6, "object") && "h" in t6 && "s" in t6 && "l" in t6 ? (r7 = e5.hsl2rgb(t6), t6.r = r7.r, t6.g = r7.g, t6.b = r7.b, t6.hex = r7.hex) : (e5.is(t6, "string") && (t6 = e5.getRGB(t6)), e5.is(t6, "object") && "r" in t6 && "g" in t6 && "b" in t6 ? (r7 = e5.rgb2hsl(t6), t6.h = r7.h, t6.s = r7.s, t6.l = r7.l, r7 = e5.rgb2hsb(t6), t6.v = r7.b) : (t6 = { hex: "none" }).r = t6.g = t6.b = t6.h = t6.s = t6.v = t6.l = -1), t6.toString = st, t6;
            }, e5.hsb2rgb = function(t6, e6, r7, i7) {
              var n5, a6, s6, o6, l7;
              return this.is(t6, "object") && "h" in t6 && "s" in t6 && "b" in t6 && (r7 = t6.b, e6 = t6.s, i7 = t6.o, t6 = t6.h), o6 = (l7 = r7 * e6) * (1 - B2((t6 = (t6 *= 360) % 360 / 60) % 2 - 1)), n5 = a6 = s6 = r7 - l7, lt(n5 += [l7, o6, 0, 0, o6, l7][t6 = ~~t6], a6 += [o6, l7, l7, o6, 0, 0][t6], s6 += [0, 0, o6, l7, l7, o6][t6], i7);
            }, e5.hsl2rgb = function(t6, e6, r7, i7) {
              var n5, a6, s6, o6, l7;
              return this.is(t6, "object") && "h" in t6 && "s" in t6 && "l" in t6 && (r7 = t6.l, e6 = t6.s, t6 = t6.h), (t6 > 1 || e6 > 1 || r7 > 1) && (t6 /= 360, e6 /= 100, r7 /= 100), o6 = (l7 = 2 * e6 * (r7 < 0.5 ? r7 : 1 - r7)) * (1 - B2((t6 = (t6 *= 360) % 360 / 60) % 2 - 1)), n5 = a6 = s6 = r7 - l7 / 2, lt(n5 += [l7, o6, 0, 0, o6, l7][t6 = ~~t6], a6 += [o6, l7, l7, o6, 0, 0][t6], s6 += [0, 0, o6, l7, l7, o6][t6], i7);
            }, e5.rgb2hsb = function(t6, e6, r7) {
              var i7, n5;
              return t6 = (r7 = ot(t6, e6, r7))[0], e6 = r7[1], r7 = r7[2], { h: ((0 == (n5 = (i7 = w4(t6, e6, r7)) - k3(t6, e6, r7)) ? null : i7 == t6 ? (e6 - r7) / n5 : i7 == e6 ? (r7 - t6) / n5 + 2 : (t6 - e6) / n5 + 4) + 360) % 6 * 60 / 360, s: 0 == n5 ? 0 : n5 / i7, b: i7, toString: nt };
            }, e5.rgb2hsl = function(t6, e6, r7) {
              var i7, n5, a6, s6;
              return t6 = (r7 = ot(t6, e6, r7))[0], e6 = r7[1], r7 = r7[2], i7 = ((n5 = w4(t6, e6, r7)) + (a6 = k3(t6, e6, r7))) / 2, { h: ((0 == (s6 = n5 - a6) ? null : n5 == t6 ? (e6 - r7) / s6 : n5 == e6 ? (r7 - t6) / s6 + 2 : (t6 - e6) / s6 + 4) + 360) % 6 * 60 / 360, s: 0 == s6 ? 0 : i7 < 0.5 ? s6 / (2 * i7) : s6 / (2 - 2 * i7), l: i7, toString: at };
            }, e5._path2string = function() {
              return this.join(",").replace(O2, "$1");
            };
            e5._preload = function(t6, e6) {
              var r7 = l6.doc.createElement("img");
              r7.style.cssText = "position:absolute;left:-9999em;top:-9999em", r7.onload = function() {
                e6.call(this), this.onload = null, l6.doc.body.removeChild(this);
              }, r7.onerror = function() {
                l6.doc.body.removeChild(this);
              }, l6.doc.body.appendChild(r7), r7.src = t6;
            };
            function ut() {
              return this.hex;
            }
            function ct(t6, e6) {
              for (var r7 = [], i7 = 0, n5 = t6.length; n5 - 2 * !e6 > i7; i7 += 2) {
                var a6 = [{ x: +t6[i7 - 2], y: +t6[i7 - 1] }, { x: +t6[i7], y: +t6[i7 + 1] }, { x: +t6[i7 + 2], y: +t6[i7 + 3] }, { x: +t6[i7 + 4], y: +t6[i7 + 5] }];
                e6 ? i7 ? n5 - 4 == i7 ? a6[3] = { x: +t6[0], y: +t6[1] } : n5 - 2 == i7 && (a6[2] = { x: +t6[0], y: +t6[1] }, a6[3] = { x: +t6[2], y: +t6[3] }) : a6[0] = { x: +t6[n5 - 2], y: +t6[n5 - 1] } : n5 - 4 == i7 ? a6[3] = a6[2] : i7 || (a6[0] = { x: +t6[i7], y: +t6[i7 + 1] }), r7.push(["C", (-a6[0].x + 6 * a6[1].x + a6[2].x) / 6, (-a6[0].y + 6 * a6[1].y + a6[2].y) / 6, (a6[1].x + 6 * a6[2].x - a6[3].x) / 6, (a6[1].y + 6 * a6[2].y - a6[3].y) / 6, a6[2].x, a6[2].y]);
              }
              return r7;
            }
            e5.getRGB = ht(function(t6) {
              if (!t6 || (t6 = x2(t6)).indexOf("-") + 1)
                return { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: ut };
              if ("none" == t6)
                return { r: -1, g: -1, b: -1, hex: "none", toString: ut };
              !q2[o5](t6.toLowerCase().substring(0, 2)) && "#" != t6.charAt() && (t6 = it(t6));
              var r7, i7, n5, a6, s6, l7, h4 = t6.match(E2);
              return h4 ? (h4[2] && (n5 = F3(h4[2].substring(5), 16), i7 = F3(h4[2].substring(3, 5), 16), r7 = F3(h4[2].substring(1, 3), 16)), h4[3] && (n5 = F3((s6 = h4[3].charAt(3)) + s6, 16), i7 = F3((s6 = h4[3].charAt(2)) + s6, 16), r7 = F3((s6 = h4[3].charAt(1)) + s6, 16)), h4[4] && (l7 = h4[4][v5](D2), r7 = z3(l7[0]), "%" == l7[0].slice(-1) && (r7 *= 2.55), i7 = z3(l7[1]), "%" == l7[1].slice(-1) && (i7 *= 2.55), n5 = z3(l7[2]), "%" == l7[2].slice(-1) && (n5 *= 2.55), "rgba" == h4[1].toLowerCase().slice(0, 4) && (a6 = z3(l7[3])), l7[3] && "%" == l7[3].slice(-1) && (a6 /= 100)), h4[5] ? (l7 = h4[5][v5](D2), r7 = z3(l7[0]), "%" == l7[0].slice(-1) && (r7 *= 2.55), i7 = z3(l7[1]), "%" == l7[1].slice(-1) && (i7 *= 2.55), n5 = z3(l7[2]), "%" == l7[2].slice(-1) && (n5 *= 2.55), ("deg" == l7[0].slice(-3) || "\xB0" == l7[0].slice(-1)) && (r7 /= 360), "hsba" == h4[1].toLowerCase().slice(0, 4) && (a6 = z3(l7[3])), l7[3] && "%" == l7[3].slice(-1) && (a6 /= 100), e5.hsb2rgb(r7, i7, n5, a6)) : h4[6] ? (l7 = h4[6][v5](D2), r7 = z3(l7[0]), "%" == l7[0].slice(-1) && (r7 *= 2.55), i7 = z3(l7[1]), "%" == l7[1].slice(-1) && (i7 *= 2.55), n5 = z3(l7[2]), "%" == l7[2].slice(-1) && (n5 *= 2.55), ("deg" == l7[0].slice(-3) || "\xB0" == l7[0].slice(-1)) && (r7 /= 360), "hsla" == h4[1].toLowerCase().slice(0, 4) && (a6 = z3(l7[3])), l7[3] && "%" == l7[3].slice(-1) && (a6 /= 100), e5.hsl2rgb(r7, i7, n5, a6)) : ((h4 = { r: r7, g: i7, b: n5, toString: ut }).hex = "#" + (16777216 | n5 | i7 << 8 | r7 << 16).toString(16).slice(1), e5.is(a6, "finite") && (h4.opacity = a6), h4)) : { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: ut };
            }, e5), e5.hsb = ht(function(t6, r7, i7) {
              return e5.hsb2rgb(t6, r7, i7).hex;
            }), e5.hsl = ht(function(t6, r7, i7) {
              return e5.hsl2rgb(t6, r7, i7).hex;
            }), e5.rgb = ht(function(t6, e6, r7) {
              function i7(t7) {
                return t7 + 0.5 | 0;
              }
              return "#" + (16777216 | i7(r7) | i7(e6) << 8 | i7(t6) << 16).toString(16).slice(1);
            }), e5.getColor = function(t6) {
              var e6 = this.getColor.start = this.getColor.start || { h: 0, s: 1, b: t6 || 0.75 }, r7 = this.hsb2rgb(e6.h, e6.s, e6.b);
              return e6.h += 0.075, e6.h > 1 && (e6.h = 0, e6.s -= 0.2, e6.s <= 0 && (this.getColor.start = { h: 0, s: 1, b: e6.b })), r7.hex;
            }, e5.getColor.reset = function() {
              delete this.start;
            }, e5.parsePathString = function(t6) {
              if (!t6)
                return null;
              var r7 = ft(t6);
              if (r7.arr)
                return mt(r7.arr);
              var i7 = { a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0 }, n5 = [];
              return e5.is(t6, A2) && e5.is(t6[0], A2) && (n5 = mt(t6)), n5.length || x2(t6).replace(V, function(t7, e6, r8) {
                var a6 = [], s6 = e6.toLowerCase();
                if (r8.replace(Y, function(t8, e7) {
                  e7 && a6.push(+e7);
                }), "m" == s6 && a6.length > 2 && (n5.push([e6][f4](a6.splice(0, 2))), s6 = "l", e6 = "m" == e6 ? "l" : "L"), "r" == s6)
                  n5.push([e6][f4](a6));
                else
                  for (; a6.length >= i7[s6] && (n5.push([e6][f4](a6.splice(0, i7[s6]))), i7[s6]); )
                    ;
              }), n5.toString = e5._path2string, r7.arr = mt(n5), n5;
            }, e5.parseTransformString = ht(function(t6) {
              if (!t6)
                return null;
              var r7 = [];
              return e5.is(t6, A2) && e5.is(t6[0], A2) && (r7 = mt(t6)), r7.length || x2(t6).replace(W, function(t7, e6, i7) {
                var n5 = [];
                b4.call(e6);
                i7.replace(Y, function(t8, e7) {
                  e7 && n5.push(+e7);
                }), r7.push([e6][f4](n5));
              }), r7.toString = e5._path2string, r7;
            }, this, function(t6) {
              if (!t6)
                return t6;
              for (var e6 = [], r7 = 0; r7 < t6.length; r7++) {
                for (var i7 = [], n5 = 0; n5 < t6[r7].length; n5++)
                  i7.push(t6[r7][n5]);
                e6.push(i7);
              }
              return e6;
            });
            var ft = function(t6) {
              var e6 = ft.ps = ft.ps || {};
              return e6[t6] ? e6[t6].sleep = 100 : e6[t6] = { sleep: 100 }, setTimeout(function() {
                for (var r7 in e6)
                  e6[o5](r7) && r7 != t6 && (e6[r7].sleep--, !e6[r7].sleep && delete e6[r7]);
              }), e6[t6];
            };
            function pt(t6, e6, r7, i7, n5) {
              return t6 * (t6 * (-3 * e6 + 9 * r7 - 9 * i7 + 3 * n5) + 6 * e6 - 12 * r7 + 6 * i7) - 3 * e6 + 3 * r7;
            }
            function dt(t6, e6, r7, i7, n5, a6, s6, o6, l7) {
              null == l7 && (l7 = 1);
              for (var h4 = (l7 = l7 > 1 ? 1 : l7 < 0 ? 0 : l7) / 2, u6 = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816], c7 = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472], f5 = 0, p6 = 0; p6 < 12; p6++) {
                var d6 = h4 * u6[p6] + h4, g5 = pt(d6, t6, r7, n5, s6), x3 = pt(d6, e6, i7, a6, o6), v6 = g5 * g5 + x3 * x3;
                f5 += c7[p6] * _4.sqrt(v6);
              }
              return h4 * f5;
            }
            function gt(t6, e6, r7, i7, n5, a6, s6, o6) {
              if (!(w4(t6, r7) < k3(n5, s6) || k3(t6, r7) > w4(n5, s6) || w4(e6, i7) < k3(a6, o6) || k3(e6, i7) > w4(a6, o6))) {
                var l7 = (t6 - r7) * (a6 - o6) - (e6 - i7) * (n5 - s6);
                if (l7) {
                  var h4 = ((t6 * i7 - e6 * r7) * (n5 - s6) - (t6 - r7) * (n5 * o6 - a6 * s6)) / l7, u6 = ((t6 * i7 - e6 * r7) * (a6 - o6) - (e6 - i7) * (n5 * o6 - a6 * s6)) / l7, c7 = +h4.toFixed(2), f5 = +u6.toFixed(2);
                  if (!(c7 < +k3(t6, r7).toFixed(2) || c7 > +w4(t6, r7).toFixed(2) || c7 < +k3(n5, s6).toFixed(2) || c7 > +w4(n5, s6).toFixed(2) || f5 < +k3(e6, i7).toFixed(2) || f5 > +w4(e6, i7).toFixed(2) || f5 < +k3(a6, o6).toFixed(2) || f5 > +w4(a6, o6).toFixed(2)))
                    return { x: h4, y: u6 };
                }
              }
            }
            function xt(t6, r7, i7) {
              var n5 = e5.bezierBBox(t6), a6 = e5.bezierBBox(r7);
              if (!e5.isBBoxIntersect(n5, a6))
                return i7 ? 0 : [];
              for (var s6 = dt.apply(0, t6), o6 = dt.apply(0, r7), l7 = w4(~~(s6 / 5), 1), h4 = w4(~~(o6 / 5), 1), u6 = [], c7 = [], f5 = {}, p6 = i7 ? 0 : [], d6 = 0; d6 < l7 + 1; d6++) {
                var g5 = e5.findDotsAtSegment.apply(e5, t6.concat(d6 / l7));
                u6.push({ x: g5.x, y: g5.y, t: d6 / l7 });
              }
              for (d6 = 0; d6 < h4 + 1; d6++)
                g5 = e5.findDotsAtSegment.apply(e5, r7.concat(d6 / h4)), c7.push({ x: g5.x, y: g5.y, t: d6 / h4 });
              for (d6 = 0; d6 < l7; d6++)
                for (var x3 = 0; x3 < h4; x3++) {
                  var v6 = u6[d6], y4 = u6[d6 + 1], m4 = c7[x3], b5 = c7[x3 + 1], _5 = B2(y4.x - v6.x) < 1e-3 ? "y" : "x", C3 = B2(b5.x - m4.x) < 1e-3 ? "y" : "x", S2 = gt(v6.x, v6.y, y4.x, y4.y, m4.x, m4.y, b5.x, b5.y);
                  if (S2) {
                    if (f5[S2.x.toFixed(4)] == S2.y.toFixed(4))
                      continue;
                    f5[S2.x.toFixed(4)] = S2.y.toFixed(4);
                    var T3 = v6.t + B2((S2[_5] - v6[_5]) / (y4[_5] - v6[_5])) * (y4.t - v6.t), A3 = m4.t + B2((S2[C3] - m4[C3]) / (b5[C3] - m4[C3])) * (b5.t - m4.t);
                    T3 >= 0 && T3 <= 1.001 && A3 >= 0 && A3 <= 1.001 && (i7 ? p6++ : p6.push({ x: S2.x, y: S2.y, t1: k3(T3, 1), t2: k3(A3, 1) }));
                  }
                }
              return p6;
            }
            function vt(t6, r7, i7) {
              t6 = e5._path2curve(t6), r7 = e5._path2curve(r7);
              for (var n5, a6, s6, o6, l7, h4, u6, c7, f5, p6, d6 = i7 ? 0 : [], g5 = 0, x3 = t6.length; g5 < x3; g5++) {
                var v6 = t6[g5];
                if ("M" == v6[0])
                  n5 = l7 = v6[1], a6 = h4 = v6[2];
                else {
                  "C" == v6[0] ? (f5 = [n5, a6].concat(v6.slice(1)), n5 = f5[6], a6 = f5[7]) : (f5 = [n5, a6, n5, a6, l7, h4, l7, h4], n5 = l7, a6 = h4);
                  for (var y4 = 0, m4 = r7.length; y4 < m4; y4++) {
                    var b5 = r7[y4];
                    if ("M" == b5[0])
                      s6 = u6 = b5[1], o6 = c7 = b5[2];
                    else {
                      "C" == b5[0] ? (p6 = [s6, o6].concat(b5.slice(1)), s6 = p6[6], o6 = p6[7]) : (p6 = [s6, o6, s6, o6, u6, c7, u6, c7], s6 = u6, o6 = c7);
                      var _5 = xt(f5, p6, i7);
                      if (i7)
                        d6 += _5;
                      else {
                        for (var w5 = 0, k4 = _5.length; w5 < k4; w5++)
                          _5[w5].segment1 = g5, _5[w5].segment2 = y4, _5[w5].bez1 = f5, _5[w5].bez2 = p6;
                        d6 = d6.concat(_5);
                      }
                    }
                  }
                }
              }
              return d6;
            }
            e5.findDotsAtSegment = function(t6, e6, r7, i7, n5, a6, s6, o6, l7) {
              var h4 = 1 - l7, u6 = C2(h4, 3), c7 = C2(h4, 2), f5 = l7 * l7, p6 = f5 * l7, d6 = u6 * t6 + 3 * c7 * l7 * r7 + 3 * h4 * l7 * l7 * n5 + p6 * s6, g5 = u6 * e6 + 3 * c7 * l7 * i7 + 3 * h4 * l7 * l7 * a6 + p6 * o6, x3 = t6 + 2 * l7 * (r7 - t6) + f5 * (n5 - 2 * r7 + t6), v6 = e6 + 2 * l7 * (i7 - e6) + f5 * (a6 - 2 * i7 + e6), y4 = r7 + 2 * l7 * (n5 - r7) + f5 * (s6 - 2 * n5 + r7), m4 = i7 + 2 * l7 * (a6 - i7) + f5 * (o6 - 2 * a6 + i7), b5 = h4 * t6 + l7 * r7, w5 = h4 * e6 + l7 * i7, k4 = h4 * n5 + l7 * s6, B3 = h4 * a6 + l7 * o6, T3 = 90 - 180 * _4.atan2(x3 - y4, v6 - m4) / S;
              return (x3 > y4 || v6 < m4) && (T3 += 180), { x: d6, y: g5, m: { x: x3, y: v6 }, n: { x: y4, y: m4 }, start: { x: b5, y: w5 }, end: { x: k4, y: B3 }, alpha: T3 };
            }, e5.bezierBBox = function(t6, r7, i7, n5, a6, s6, o6, l7) {
              e5.is(t6, "array") || (t6 = [t6, r7, i7, n5, a6, s6, o6, l7]);
              var h4 = St.apply(null, t6);
              return { x: h4.min.x, y: h4.min.y, x2: h4.max.x, y2: h4.max.y, width: h4.max.x - h4.min.x, height: h4.max.y - h4.min.y };
            }, e5.isPointInsideBBox = function(t6, e6, r7) {
              return e6 >= t6.x && e6 <= t6.x2 && r7 >= t6.y && r7 <= t6.y2;
            }, e5.isBBoxIntersect = function(t6, r7) {
              var i7 = e5.isPointInsideBBox;
              return i7(r7, t6.x, t6.y) || i7(r7, t6.x2, t6.y) || i7(r7, t6.x, t6.y2) || i7(r7, t6.x2, t6.y2) || i7(t6, r7.x, r7.y) || i7(t6, r7.x2, r7.y) || i7(t6, r7.x, r7.y2) || i7(t6, r7.x2, r7.y2) || (t6.x < r7.x2 && t6.x > r7.x || r7.x < t6.x2 && r7.x > t6.x) && (t6.y < r7.y2 && t6.y > r7.y || r7.y < t6.y2 && r7.y > t6.y);
            }, e5.pathIntersection = function(t6, e6) {
              return vt(t6, e6);
            }, e5.pathIntersectionNumber = function(t6, e6) {
              return vt(t6, e6, 1);
            }, e5.isPointInsidePath = function(t6, r7, i7) {
              var n5 = e5.pathBBox(t6);
              return e5.isPointInsideBBox(n5, r7, i7) && vt(t6, [["M", r7, i7], ["H", n5.x2 + 10]], 1) % 2 == 1;
            }, e5._removedFactory = function(e6) {
              return function() {
                t5("raphael.log", null, "Rapha\xEBl: you are calling to method \u201C" + e6 + "\u201D of removed object", e6);
              };
            };
            var yt = e5.pathBBox = function(t6) {
              var e6 = ft(t6);
              if (e6.bbox)
                return tt(e6.bbox);
              if (!t6)
                return { x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0 };
              for (var r7, i7 = 0, n5 = 0, a6 = [], s6 = [], o6 = 0, l7 = (t6 = Tt(t6)).length; o6 < l7; o6++)
                if ("M" == (r7 = t6[o6])[0])
                  i7 = r7[1], n5 = r7[2], a6.push(i7), s6.push(n5);
                else {
                  var h4 = St(i7, n5, r7[1], r7[2], r7[3], r7[4], r7[5], r7[6]);
                  a6 = a6[f4](h4.min.x, h4.max.x), s6 = s6[f4](h4.min.y, h4.max.y), i7 = r7[5], n5 = r7[6];
                }
              var u6 = k3[c6](0, a6), p6 = k3[c6](0, s6), d6 = w4[c6](0, a6), g5 = w4[c6](0, s6), x3 = d6 - u6, v6 = g5 - p6, y4 = { x: u6, y: p6, x2: d6, y2: g5, width: x3, height: v6, cx: u6 + x3 / 2, cy: p6 + v6 / 2 };
              return e6.bbox = tt(y4), y4;
            }, mt = function(t6) {
              var r7 = tt(t6);
              return r7.toString = e5._path2string, r7;
            }, bt = e5._pathToRelative = function(t6) {
              var r7 = ft(t6);
              if (r7.rel)
                return mt(r7.rel);
              e5.is(t6, A2) && e5.is(t6 && t6[0], A2) || (t6 = e5.parsePathString(t6));
              var i7 = [], n5 = 0, a6 = 0, s6 = 0, o6 = 0, l7 = 0;
              "M" == t6[0][0] && (s6 = n5 = t6[0][1], o6 = a6 = t6[0][2], l7++, i7.push(["M", n5, a6]));
              for (var h4 = l7, u6 = t6.length; h4 < u6; h4++) {
                var c7 = i7[h4] = [], f5 = t6[h4];
                if (f5[0] != b4.call(f5[0]))
                  switch (c7[0] = b4.call(f5[0]), c7[0]) {
                    case "a":
                      c7[1] = f5[1], c7[2] = f5[2], c7[3] = f5[3], c7[4] = f5[4], c7[5] = f5[5], c7[6] = +(f5[6] - n5).toFixed(3), c7[7] = +(f5[7] - a6).toFixed(3);
                      break;
                    case "v":
                      c7[1] = +(f5[1] - a6).toFixed(3);
                      break;
                    case "m":
                      s6 = f5[1], o6 = f5[2];
                    default:
                      for (var p6 = 1, d6 = f5.length; p6 < d6; p6++)
                        c7[p6] = +(f5[p6] - (p6 % 2 ? n5 : a6)).toFixed(3);
                  }
                else {
                  c7 = i7[h4] = [], "m" == f5[0] && (s6 = f5[1] + n5, o6 = f5[2] + a6);
                  for (var g5 = 0, x3 = f5.length; g5 < x3; g5++)
                    i7[h4][g5] = f5[g5];
                }
                var v6 = i7[h4].length;
                switch (i7[h4][0]) {
                  case "z":
                    n5 = s6, a6 = o6;
                    break;
                  case "h":
                    n5 += +i7[h4][v6 - 1];
                    break;
                  case "v":
                    a6 += +i7[h4][v6 - 1];
                    break;
                  default:
                    n5 += +i7[h4][v6 - 2], a6 += +i7[h4][v6 - 1];
                }
              }
              return i7.toString = e5._path2string, r7.rel = mt(i7), i7;
            }, _t = e5._pathToAbsolute = function(t6) {
              var r7 = ft(t6);
              if (r7.abs)
                return mt(r7.abs);
              if (e5.is(t6, A2) && e5.is(t6 && t6[0], A2) || (t6 = e5.parsePathString(t6)), !t6 || !t6.length)
                return [["M", 0, 0]];
              var i7 = [], n5 = 0, a6 = 0, s6 = 0, o6 = 0, l7 = 0;
              "M" == t6[0][0] && (s6 = n5 = +t6[0][1], o6 = a6 = +t6[0][2], l7++, i7[0] = ["M", n5, a6]);
              for (var h4, u6, c7 = 3 == t6.length && "M" == t6[0][0] && "R" == t6[1][0].toUpperCase() && "Z" == t6[2][0].toUpperCase(), p6 = l7, d6 = t6.length; p6 < d6; p6++) {
                if (i7.push(h4 = []), (u6 = t6[p6])[0] != R.call(u6[0]))
                  switch (h4[0] = R.call(u6[0]), h4[0]) {
                    case "A":
                      h4[1] = u6[1], h4[2] = u6[2], h4[3] = u6[3], h4[4] = u6[4], h4[5] = u6[5], h4[6] = +(u6[6] + n5), h4[7] = +(u6[7] + a6);
                      break;
                    case "V":
                      h4[1] = +u6[1] + a6;
                      break;
                    case "H":
                      h4[1] = +u6[1] + n5;
                      break;
                    case "R":
                      for (var g5 = [n5, a6][f4](u6.slice(1)), x3 = 2, v6 = g5.length; x3 < v6; x3++)
                        g5[x3] = +g5[x3] + n5, g5[++x3] = +g5[x3] + a6;
                      i7.pop(), i7 = i7[f4](ct(g5, c7));
                      break;
                    case "M":
                      s6 = +u6[1] + n5, o6 = +u6[2] + a6;
                    default:
                      for (x3 = 1, v6 = u6.length; x3 < v6; x3++)
                        h4[x3] = +u6[x3] + (x3 % 2 ? n5 : a6);
                  }
                else if ("R" == u6[0])
                  g5 = [n5, a6][f4](u6.slice(1)), i7.pop(), i7 = i7[f4](ct(g5, c7)), h4 = ["R"][f4](u6.slice(-2));
                else
                  for (var y4 = 0, m4 = u6.length; y4 < m4; y4++)
                    h4[y4] = u6[y4];
                switch (h4[0]) {
                  case "Z":
                    n5 = s6, a6 = o6;
                    break;
                  case "H":
                    n5 = h4[1];
                    break;
                  case "V":
                    a6 = h4[1];
                    break;
                  case "M":
                    s6 = h4[h4.length - 2], o6 = h4[h4.length - 1];
                  default:
                    n5 = h4[h4.length - 2], a6 = h4[h4.length - 1];
                }
              }
              return i7.toString = e5._path2string, r7.abs = mt(i7), i7;
            }, wt = function(t6, e6, r7, i7) {
              return [t6, e6, r7, i7, r7, i7];
            }, kt = function(t6, e6, r7, i7, n5, a6) {
              return [1 / 3 * t6 + 2 / 3 * r7, 1 / 3 * e6 + 2 / 3 * i7, 1 / 3 * n5 + 2 / 3 * r7, 1 / 3 * a6 + 2 / 3 * i7, n5, a6];
            }, Bt = function(t6, e6, r7, i7, n5, a6, s6, o6, l7, h4) {
              var u6, c7 = 120 * S / 180, p6 = S / 180 * (+n5 || 0), d6 = [], g5 = ht(function(t7, e7, r8) {
                return { x: t7 * _4.cos(r8) - e7 * _4.sin(r8), y: t7 * _4.sin(r8) + e7 * _4.cos(r8) };
              });
              if (h4)
                A3 = h4[0], M3 = h4[1], C3 = h4[2], T3 = h4[3];
              else {
                t6 = (u6 = g5(t6, e6, -p6)).x, e6 = u6.y, o6 = (u6 = g5(o6, l7, -p6)).x, l7 = u6.y;
                _4.cos(S / 180 * n5), _4.sin(S / 180 * n5);
                var x3 = (t6 - o6) / 2, y4 = (e6 - l7) / 2, m4 = x3 * x3 / (r7 * r7) + y4 * y4 / (i7 * i7);
                m4 > 1 && (r7 *= m4 = _4.sqrt(m4), i7 *= m4);
                var b5 = r7 * r7, w5 = i7 * i7, k4 = (a6 == s6 ? -1 : 1) * _4.sqrt(B2((b5 * w5 - b5 * y4 * y4 - w5 * x3 * x3) / (b5 * y4 * y4 + w5 * x3 * x3))), C3 = k4 * r7 * y4 / i7 + (t6 + o6) / 2, T3 = k4 * -i7 * x3 / r7 + (e6 + l7) / 2, A3 = _4.asin(((e6 - T3) / i7).toFixed(9)), M3 = _4.asin(((l7 - T3) / i7).toFixed(9));
                (A3 = t6 < C3 ? S - A3 : A3) < 0 && (A3 = 2 * S + A3), (M3 = o6 < C3 ? S - M3 : M3) < 0 && (M3 = 2 * S + M3), s6 && A3 > M3 && (A3 -= 2 * S), !s6 && M3 > A3 && (M3 -= 2 * S);
              }
              var E3 = M3 - A3;
              if (B2(E3) > c7) {
                var N3 = M3, L3 = o6, P3 = l7;
                M3 = A3 + c7 * (s6 && M3 > A3 ? 1 : -1), o6 = C3 + r7 * _4.cos(M3), l7 = T3 + i7 * _4.sin(M3), d6 = Bt(o6, l7, r7, i7, n5, 0, s6, L3, P3, [M3, N3, C3, T3]);
              }
              E3 = M3 - A3;
              var z4 = _4.cos(A3), F4 = _4.sin(A3), R2 = _4.cos(M3), j4 = _4.sin(M3), I3 = _4.tan(E3 / 4), D3 = 4 / 3 * r7 * I3, q3 = 4 / 3 * i7 * I3, O3 = [t6, e6], V2 = [t6 + D3 * F4, e6 - q3 * z4], W2 = [o6 + D3 * j4, l7 - q3 * R2], Y2 = [o6, l7];
              if (V2[0] = 2 * O3[0] - V2[0], V2[1] = 2 * O3[1] - V2[1], h4)
                return [V2, W2, Y2][f4](d6);
              for (var G2 = [], H3 = 0, X2 = (d6 = [V2, W2, Y2][f4](d6).join()[v5](",")).length; H3 < X2; H3++)
                G2[H3] = H3 % 2 ? g5(d6[H3 - 1], d6[H3], p6).y : g5(d6[H3], d6[H3 + 1], p6).x;
              return G2;
            }, Ct = function(t6, e6, r7, i7, n5, a6, s6, o6, l7) {
              var h4 = 1 - l7;
              return { x: C2(h4, 3) * t6 + 3 * C2(h4, 2) * l7 * r7 + 3 * h4 * l7 * l7 * n5 + C2(l7, 3) * s6, y: C2(h4, 3) * e6 + 3 * C2(h4, 2) * l7 * i7 + 3 * h4 * l7 * l7 * a6 + C2(l7, 3) * o6 };
            }, St = ht(function(t6, e6, r7, i7, n5, a6, s6, o6) {
              var l7, h4 = n5 - 2 * r7 + t6 - (s6 - 2 * n5 + r7), u6 = 2 * (r7 - t6) - 2 * (n5 - r7), f5 = t6 - r7, p6 = (-u6 + _4.sqrt(u6 * u6 - 4 * h4 * f5)) / 2 / h4, d6 = (-u6 - _4.sqrt(u6 * u6 - 4 * h4 * f5)) / 2 / h4, g5 = [e6, o6], x3 = [t6, s6];
              return B2(p6) > "1e12" && (p6 = 0.5), B2(d6) > "1e12" && (d6 = 0.5), p6 > 0 && p6 < 1 && (l7 = Ct(t6, e6, r7, i7, n5, a6, s6, o6, p6), x3.push(l7.x), g5.push(l7.y)), d6 > 0 && d6 < 1 && (l7 = Ct(t6, e6, r7, i7, n5, a6, s6, o6, d6), x3.push(l7.x), g5.push(l7.y)), h4 = a6 - 2 * i7 + e6 - (o6 - 2 * a6 + i7), f5 = e6 - i7, p6 = (-(u6 = 2 * (i7 - e6) - 2 * (a6 - i7)) + _4.sqrt(u6 * u6 - 4 * h4 * f5)) / 2 / h4, d6 = (-u6 - _4.sqrt(u6 * u6 - 4 * h4 * f5)) / 2 / h4, B2(p6) > "1e12" && (p6 = 0.5), B2(d6) > "1e12" && (d6 = 0.5), p6 > 0 && p6 < 1 && (l7 = Ct(t6, e6, r7, i7, n5, a6, s6, o6, p6), x3.push(l7.x), g5.push(l7.y)), d6 > 0 && d6 < 1 && (l7 = Ct(t6, e6, r7, i7, n5, a6, s6, o6, d6), x3.push(l7.x), g5.push(l7.y)), { min: { x: k3[c6](0, x3), y: k3[c6](0, g5) }, max: { x: w4[c6](0, x3), y: w4[c6](0, g5) } };
            }), Tt = e5._path2curve = ht(function(t6, e6) {
              var r7 = !e6 && ft(t6);
              if (!e6 && r7.curve)
                return mt(r7.curve);
              for (var i7 = _t(t6), n5 = e6 && _t(e6), a6 = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null }, s6 = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null }, o6 = function(t7, e7, r8) {
                var i8, n6;
                if (!t7)
                  return ["C", e7.x, e7.y, e7.x, e7.y, e7.x, e7.y];
                switch (!(t7[0] in { T: 1, Q: 1 }) && (e7.qx = e7.qy = null), t7[0]) {
                  case "M":
                    e7.X = t7[1], e7.Y = t7[2];
                    break;
                  case "A":
                    t7 = ["C"][f4](Bt[c6](0, [e7.x, e7.y][f4](t7.slice(1))));
                    break;
                  case "S":
                    "C" == r8 || "S" == r8 ? (i8 = 2 * e7.x - e7.bx, n6 = 2 * e7.y - e7.by) : (i8 = e7.x, n6 = e7.y), t7 = ["C", i8, n6][f4](t7.slice(1));
                    break;
                  case "T":
                    "Q" == r8 || "T" == r8 ? (e7.qx = 2 * e7.x - e7.qx, e7.qy = 2 * e7.y - e7.qy) : (e7.qx = e7.x, e7.qy = e7.y), t7 = ["C"][f4](kt(e7.x, e7.y, e7.qx, e7.qy, t7[1], t7[2]));
                    break;
                  case "Q":
                    e7.qx = t7[1], e7.qy = t7[2], t7 = ["C"][f4](kt(e7.x, e7.y, t7[1], t7[2], t7[3], t7[4]));
                    break;
                  case "L":
                    t7 = ["C"][f4](wt(e7.x, e7.y, t7[1], t7[2]));
                    break;
                  case "H":
                    t7 = ["C"][f4](wt(e7.x, e7.y, t7[1], e7.y));
                    break;
                  case "V":
                    t7 = ["C"][f4](wt(e7.x, e7.y, e7.x, t7[1]));
                    break;
                  case "Z":
                    t7 = ["C"][f4](wt(e7.x, e7.y, e7.X, e7.Y));
                }
                return t7;
              }, l7 = function(t7, e7) {
                if (t7[e7].length > 7) {
                  t7[e7].shift();
                  for (var r8 = t7[e7]; r8.length; )
                    u6[e7] = "A", n5 && (p6[e7] = "A"), t7.splice(e7++, 0, ["C"][f4](r8.splice(0, 6)));
                  t7.splice(e7, 1), v6 = w4(i7.length, n5 && n5.length || 0);
                }
              }, h4 = function(t7, e7, r8, a7, s7) {
                t7 && e7 && "M" == t7[s7][0] && "M" != e7[s7][0] && (e7.splice(s7, 0, ["M", a7.x, a7.y]), r8.bx = 0, r8.by = 0, r8.x = t7[s7][1], r8.y = t7[s7][2], v6 = w4(i7.length, n5 && n5.length || 0));
              }, u6 = [], p6 = [], d6 = "", g5 = "", x3 = 0, v6 = w4(i7.length, n5 && n5.length || 0); x3 < v6; x3++) {
                i7[x3] && (d6 = i7[x3][0]), "C" != d6 && (u6[x3] = d6, x3 && (g5 = u6[x3 - 1])), i7[x3] = o6(i7[x3], a6, g5), "A" != u6[x3] && "C" == d6 && (u6[x3] = "C"), l7(i7, x3), n5 && (n5[x3] && (d6 = n5[x3][0]), "C" != d6 && (p6[x3] = d6, x3 && (g5 = p6[x3 - 1])), n5[x3] = o6(n5[x3], s6, g5), "A" != p6[x3] && "C" == d6 && (p6[x3] = "C"), l7(n5, x3)), h4(i7, n5, a6, s6, x3), h4(n5, i7, s6, a6, x3);
                var y4 = i7[x3], m4 = n5 && n5[x3], b5 = y4.length, _5 = n5 && m4.length;
                a6.x = y4[b5 - 2], a6.y = y4[b5 - 1], a6.bx = z3(y4[b5 - 4]) || a6.x, a6.by = z3(y4[b5 - 3]) || a6.y, s6.bx = n5 && (z3(m4[_5 - 4]) || s6.x), s6.by = n5 && (z3(m4[_5 - 3]) || s6.y), s6.x = n5 && m4[_5 - 2], s6.y = n5 && m4[_5 - 1];
              }
              return n5 || (r7.curve = mt(i7)), n5 ? [i7, n5] : i7;
            }, null, mt), At = (e5._parseDots = ht(function(t6) {
              for (var r7 = [], i7 = 0, n5 = t6.length; i7 < n5; i7++) {
                var a6 = {}, s6 = t6[i7].match(/^([^:]*):?([\d\.]*)/);
                if (a6.color = e5.getRGB(s6[1]), a6.color.error)
                  return null;
                a6.opacity = a6.color.opacity, a6.color = a6.color.hex, s6[2] && (a6.offset = s6[2] + "%"), r7.push(a6);
              }
              for (i7 = 1, n5 = r7.length - 1; i7 < n5; i7++)
                if (!r7[i7].offset) {
                  for (var o6 = z3(r7[i7 - 1].offset || 0), l7 = 0, h4 = i7 + 1; h4 < n5; h4++)
                    if (r7[h4].offset) {
                      l7 = r7[h4].offset;
                      break;
                    }
                  l7 || (l7 = 100, h4 = n5);
                  for (var u6 = ((l7 = z3(l7)) - o6) / (h4 - i7 + 1); i7 < h4; i7++)
                    o6 += u6, r7[i7].offset = o6 + "%";
                }
              return r7;
            }), e5._tear = function(t6, e6) {
              t6 == e6.top && (e6.top = t6.prev), t6 == e6.bottom && (e6.bottom = t6.next), t6.next && (t6.next.prev = t6.prev), t6.prev && (t6.prev.next = t6.next);
            }), Mt = (e5._tofront = function(t6, e6) {
              e6.top !== t6 && (At(t6, e6), t6.next = null, t6.prev = e6.top, e6.top.next = t6, e6.top = t6);
            }, e5._toback = function(t6, e6) {
              e6.bottom !== t6 && (At(t6, e6), t6.next = e6.bottom, t6.prev = null, e6.bottom.prev = t6, e6.bottom = t6);
            }, e5._insertafter = function(t6, e6, r7) {
              At(t6, r7), e6 == r7.top && (r7.top = t6), e6.next && (e6.next.prev = t6), t6.next = e6.next, t6.prev = e6, e6.next = t6;
            }, e5._insertbefore = function(t6, e6, r7) {
              At(t6, r7), e6 == r7.bottom && (r7.bottom = t6), e6.prev && (e6.prev.next = t6), t6.prev = e6.prev, e6.prev = t6, t6.next = e6;
            }, e5.toMatrix = function(t6, e6) {
              var r7 = yt(t6), i7 = { _: { transform: d5 }, getBBox: function() {
                return r7;
              } };
              return Et(i7, e6), i7.matrix;
            }), Et = (e5.transformPath = function(t6, e6) {
              return Q(t6, Mt(t6, e6));
            }, e5._extractTransform = function(t6, r7) {
              if (null == r7)
                return t6._.transform;
              r7 = x2(r7).replace(/\.{3}|\u2026/g, t6._.transform || d5);
              var i7, n5, a6 = e5.parseTransformString(r7), s6 = 0, o6 = 1, l7 = 1, h4 = t6._, u6 = new Pt();
              if (h4.transform = a6 || [], a6)
                for (var c7 = 0, f5 = a6.length; c7 < f5; c7++) {
                  var p6, g5, v6, y4, m4, b5 = a6[c7], _5 = b5.length, w5 = x2(b5[0]).toLowerCase(), k4 = b5[0] != w5, B3 = k4 ? u6.invert() : 0;
                  "t" == w5 && 3 == _5 ? k4 ? (p6 = B3.x(0, 0), g5 = B3.y(0, 0), v6 = B3.x(b5[1], b5[2]), y4 = B3.y(b5[1], b5[2]), u6.translate(v6 - p6, y4 - g5)) : u6.translate(b5[1], b5[2]) : "r" == w5 ? 2 == _5 ? (m4 = m4 || t6.getBBox(1), u6.rotate(b5[1], m4.x + m4.width / 2, m4.y + m4.height / 2), s6 += b5[1]) : 4 == _5 && (k4 ? (v6 = B3.x(b5[2], b5[3]), y4 = B3.y(b5[2], b5[3]), u6.rotate(b5[1], v6, y4)) : u6.rotate(b5[1], b5[2], b5[3]), s6 += b5[1]) : "s" == w5 ? 2 == _5 || 3 == _5 ? (m4 = m4 || t6.getBBox(1), u6.scale(b5[1], b5[_5 - 1], m4.x + m4.width / 2, m4.y + m4.height / 2), o6 *= b5[1], l7 *= b5[_5 - 1]) : 5 == _5 && (k4 ? (v6 = B3.x(b5[3], b5[4]), y4 = B3.y(b5[3], b5[4]), u6.scale(b5[1], b5[2], v6, y4)) : u6.scale(b5[1], b5[2], b5[3], b5[4]), o6 *= b5[1], l7 *= b5[2]) : "m" == w5 && 7 == _5 && u6.add(b5[1], b5[2], b5[3], b5[4], b5[5], b5[6]), h4.dirtyT = 1, t6.matrix = u6;
                }
              t6.matrix = u6, h4.sx = o6, h4.sy = l7, h4.deg = s6, h4.dx = i7 = u6.e, h4.dy = n5 = u6.f, 1 == o6 && 1 == l7 && !s6 && h4.bbox ? (h4.bbox.x += +i7, h4.bbox.y += +n5) : h4.dirtyT = 1;
            }), Nt = function(t6) {
              var e6 = t6[0];
              switch (e6.toLowerCase()) {
                case "t":
                  return [e6, 0, 0];
                case "m":
                  return [e6, 1, 0, 0, 1, 0, 0];
                case "r":
                  return 4 == t6.length ? [e6, 0, t6[2], t6[3]] : [e6, 0];
                case "s":
                  return 5 == t6.length ? [e6, 1, 1, t6[3], t6[4]] : 3 == t6.length ? [e6, 1, 1] : [e6, 1];
              }
            }, Lt = e5._equaliseTransform = function(t6, r7) {
              r7 = x2(r7).replace(/\.{3}|\u2026/g, t6), t6 = e5.parseTransformString(t6) || [], r7 = e5.parseTransformString(r7) || [];
              for (var i7, n5, a6, s6, o6 = w4(t6.length, r7.length), l7 = [], h4 = [], u6 = 0; u6 < o6; u6++) {
                if (a6 = t6[u6] || Nt(r7[u6]), s6 = r7[u6] || Nt(a6), a6[0] != s6[0] || "r" == a6[0].toLowerCase() && (a6[2] != s6[2] || a6[3] != s6[3]) || "s" == a6[0].toLowerCase() && (a6[3] != s6[3] || a6[4] != s6[4]))
                  return;
                for (l7[u6] = [], h4[u6] = [], i7 = 0, n5 = w4(a6.length, s6.length); i7 < n5; i7++)
                  i7 in a6 && (l7[u6][i7] = a6[i7]), i7 in s6 && (h4[u6][i7] = s6[i7]);
              }
              return { from: l7, to: h4 };
            };
            function Pt(t6, e6, r7, i7, n5, a6) {
              null != t6 ? (this.a = +t6, this.b = +e6, this.c = +r7, this.d = +i7, this.e = +n5, this.f = +a6) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0);
            }
            e5._getContainer = function(t6, r7, i7, n5) {
              var a6;
              if (null != (a6 = null != n5 || e5.is(t6, "object") ? t6 : l6.doc.getElementById(t6)))
                return a6.tagName ? null == r7 ? { container: a6, width: a6.style.pixelWidth || a6.offsetWidth, height: a6.style.pixelHeight || a6.offsetHeight } : { container: a6, width: r7, height: i7 } : { container: 1, x: t6, y: r7, width: i7, height: n5 };
            }, e5.pathToRelative = bt, e5._engine = {}, e5.path2curve = Tt, e5.matrix = function(t6, e6, r7, i7, n5, a6) {
              return new Pt(t6, e6, r7, i7, n5, a6);
            }, function(t6) {
              function r7(t7) {
                return t7[0] * t7[0] + t7[1] * t7[1];
              }
              function i7(t7) {
                var e6 = _4.sqrt(r7(t7));
                t7[0] && (t7[0] /= e6), t7[1] && (t7[1] /= e6);
              }
              t6.add = function(t7, e6, r8, i8, n5, a6) {
                var s6, o6, l7, h4, u6 = [[], [], []], c7 = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]], f5 = [[t7, r8, n5], [e6, i8, a6], [0, 0, 1]];
                for (t7 && t7 instanceof Pt && (f5 = [[t7.a, t7.c, t7.e], [t7.b, t7.d, t7.f], [0, 0, 1]]), s6 = 0; s6 < 3; s6++)
                  for (o6 = 0; o6 < 3; o6++) {
                    for (h4 = 0, l7 = 0; l7 < 3; l7++)
                      h4 += c7[s6][l7] * f5[l7][o6];
                    u6[s6][o6] = h4;
                  }
                this.a = u6[0][0], this.b = u6[1][0], this.c = u6[0][1], this.d = u6[1][1], this.e = u6[0][2], this.f = u6[1][2];
              }, t6.invert = function() {
                var t7 = this, e6 = t7.a * t7.d - t7.b * t7.c;
                return new Pt(t7.d / e6, -t7.b / e6, -t7.c / e6, t7.a / e6, (t7.c * t7.f - t7.d * t7.e) / e6, (t7.b * t7.e - t7.a * t7.f) / e6);
              }, t6.clone = function() {
                return new Pt(this.a, this.b, this.c, this.d, this.e, this.f);
              }, t6.translate = function(t7, e6) {
                this.add(1, 0, 0, 1, t7, e6);
              }, t6.scale = function(t7, e6, r8, i8) {
                null == e6 && (e6 = t7), (r8 || i8) && this.add(1, 0, 0, 1, r8, i8), this.add(t7, 0, 0, e6, 0, 0), (r8 || i8) && this.add(1, 0, 0, 1, -r8, -i8);
              }, t6.rotate = function(t7, r8, i8) {
                t7 = e5.rad(t7), r8 = r8 || 0, i8 = i8 || 0;
                var n5 = +_4.cos(t7).toFixed(9), a6 = +_4.sin(t7).toFixed(9);
                this.add(n5, a6, -a6, n5, r8, i8), this.add(1, 0, 0, 1, -r8, -i8);
              }, t6.x = function(t7, e6) {
                return t7 * this.a + e6 * this.c + this.e;
              }, t6.y = function(t7, e6) {
                return t7 * this.b + e6 * this.d + this.f;
              }, t6.get = function(t7) {
                return +this[x2.fromCharCode(97 + t7)].toFixed(4);
              }, t6.toString = function() {
                return e5.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
              }, t6.toFilter = function() {
                return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
              }, t6.offset = function() {
                return [this.e.toFixed(4), this.f.toFixed(4)];
              }, t6.split = function() {
                var t7 = {};
                t7.dx = this.e, t7.dy = this.f;
                var n5 = [[this.a, this.c], [this.b, this.d]];
                t7.scalex = _4.sqrt(r7(n5[0])), i7(n5[0]), t7.shear = n5[0][0] * n5[1][0] + n5[0][1] * n5[1][1], n5[1] = [n5[1][0] - n5[0][0] * t7.shear, n5[1][1] - n5[0][1] * t7.shear], t7.scaley = _4.sqrt(r7(n5[1])), i7(n5[1]), t7.shear /= t7.scaley;
                var a6 = -n5[0][1], s6 = n5[1][1];
                return s6 < 0 ? (t7.rotate = e5.deg(_4.acos(s6)), a6 < 0 && (t7.rotate = 360 - t7.rotate)) : t7.rotate = e5.deg(_4.asin(a6)), t7.isSimple = !(+t7.shear.toFixed(9) || t7.scalex.toFixed(9) != t7.scaley.toFixed(9) && t7.rotate), t7.isSuperSimple = !+t7.shear.toFixed(9) && t7.scalex.toFixed(9) == t7.scaley.toFixed(9) && !t7.rotate, t7.noRotation = !+t7.shear.toFixed(9) && !t7.rotate, t7;
              }, t6.toTransformString = function(t7) {
                var e6 = t7 || this[v5]();
                return e6.isSimple ? (e6.scalex = +e6.scalex.toFixed(4), e6.scaley = +e6.scaley.toFixed(4), e6.rotate = +e6.rotate.toFixed(4), (e6.dx || e6.dy ? "t" + [e6.dx, e6.dy] : d5) + (1 != e6.scalex || 1 != e6.scaley ? "s" + [e6.scalex, e6.scaley, 0, 0] : d5) + (e6.rotate ? "r" + [e6.rotate, 0, 0] : d5)) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
              };
            }(Pt.prototype);
            for (var zt = function() {
              this.returnValue = false;
            }, Ft = function() {
              return this.originalEvent.preventDefault();
            }, Rt = function() {
              this.cancelBubble = true;
            }, jt = function() {
              return this.originalEvent.stopPropagation();
            }, It = function(t6) {
              var e6 = l6.doc.documentElement.scrollTop || l6.doc.body.scrollTop, r7 = l6.doc.documentElement.scrollLeft || l6.doc.body.scrollLeft;
              return { x: t6.clientX + r7, y: t6.clientY + e6 };
            }, Dt = l6.doc.addEventListener ? function(t6, e6, r7, i7) {
              var n5 = function(t7) {
                var e7 = It(t7);
                return r7.call(i7, t7, e7.x, e7.y);
              };
              if (t6.addEventListener(e6, n5, false), p5 && m3[e6]) {
                var a6 = function(e7) {
                  for (var n6 = It(e7), a7 = e7, s6 = 0, o6 = e7.targetTouches && e7.targetTouches.length; s6 < o6; s6++)
                    if (e7.targetTouches[s6].target == t6) {
                      (e7 = e7.targetTouches[s6]).originalEvent = a7, e7.preventDefault = Ft, e7.stopPropagation = jt;
                      break;
                    }
                  return r7.call(i7, e7, n6.x, n6.y);
                };
                t6.addEventListener(m3[e6], a6, false);
              }
              return function() {
                return t6.removeEventListener(e6, n5, false), p5 && m3[e6] && t6.removeEventListener(m3[e6], a6, false), true;
              };
            } : l6.doc.attachEvent ? function(t6, e6, r7, i7) {
              var n5 = function(t7) {
                t7 = t7 || l6.win.event;
                var e7 = l6.doc.documentElement.scrollTop || l6.doc.body.scrollTop, n6 = l6.doc.documentElement.scrollLeft || l6.doc.body.scrollLeft, a6 = t7.clientX + n6, s6 = t7.clientY + e7;
                return t7.preventDefault = t7.preventDefault || zt, t7.stopPropagation = t7.stopPropagation || Rt, r7.call(i7, t7, a6, s6);
              };
              return t6.attachEvent("on" + e6, n5), function() {
                return t6.detachEvent("on" + e6, n5), true;
              };
            } : void 0, qt = [], Ot = function(e6) {
              for (var r7, i7 = e6.clientX, n5 = e6.clientY, a6 = l6.doc.documentElement.scrollTop || l6.doc.body.scrollTop, s6 = l6.doc.documentElement.scrollLeft || l6.doc.body.scrollLeft, o6 = qt.length; o6--; ) {
                if (r7 = qt[o6], p5 && e6.touches) {
                  for (var h4, u6 = e6.touches.length; u6--; )
                    if ((h4 = e6.touches[u6]).identifier == r7.el._drag.id) {
                      i7 = h4.clientX, n5 = h4.clientY, (e6.originalEvent ? e6.originalEvent : e6).preventDefault();
                      break;
                    }
                } else
                  e6.preventDefault();
                var c7, f5 = r7.el.node, d6 = f5.nextSibling, g5 = f5.parentNode, x3 = f5.style.display;
                l6.win.opera && g5.removeChild(f5), f5.style.display = "none", c7 = r7.el.paper.getElementByPoint(i7, n5), f5.style.display = x3, l6.win.opera && (d6 ? g5.insertBefore(f5, d6) : g5.appendChild(f5)), c7 && t5("raphael.drag.over." + r7.el.id, r7.el, c7), i7 += s6, n5 += a6, t5("raphael.drag.move." + r7.el.id, r7.move_scope || r7.el, i7 - r7.el._drag.x, n5 - r7.el._drag.y, i7, n5, e6);
              }
            }, Vt = function(r7) {
              e5.unmousemove(Ot).unmouseup(Vt);
              for (var i7, n5 = qt.length; n5--; )
                (i7 = qt[n5]).el._drag = {}, t5("raphael.drag.end." + i7.el.id, i7.end_scope || i7.start_scope || i7.move_scope || i7.el, r7);
              qt = [];
            }, Wt = e5.el = {}, Yt = y3.length; Yt--; )
              !function(t6) {
                e5[t6] = Wt[t6] = function(r7, i7) {
                  return e5.is(r7, "function") && (this.events = this.events || [], this.events.push({ name: t6, f: r7, unbind: Dt(this.shape || this.node || l6.doc, t6, r7, i7 || this) })), this;
                }, e5["un" + t6] = Wt["un" + t6] = function(r7) {
                  for (var i7 = this.events || [], n5 = i7.length; n5--; )
                    i7[n5].name != t6 || !e5.is(r7, "undefined") && i7[n5].f != r7 || (i7[n5].unbind(), i7.splice(n5, 1), !i7.length && delete this.events);
                  return this;
                };
              }(y3[Yt]);
            Wt.data = function(r7, i7) {
              var n5 = G[this.id] = G[this.id] || {};
              if (0 == arguments.length)
                return n5;
              if (1 == arguments.length) {
                if (e5.is(r7, "object")) {
                  for (var a6 in r7)
                    r7[o5](a6) && this.data(a6, r7[a6]);
                  return this;
                }
                return t5("raphael.data.get." + this.id, this, n5[r7], r7), n5[r7];
              }
              return n5[r7] = i7, t5("raphael.data.set." + this.id, this, i7, r7), this;
            }, Wt.removeData = function(t6) {
              return null == t6 ? delete G[this.id] : G[this.id] && delete G[this.id][t6], this;
            }, Wt.getData = function() {
              return tt(G[this.id] || {});
            }, Wt.hover = function(t6, e6, r7, i7) {
              return this.mouseover(t6, r7).mouseout(e6, i7 || r7);
            }, Wt.unhover = function(t6, e6) {
              return this.unmouseover(t6).unmouseout(e6);
            };
            var Gt = [];
            Wt.drag = function(r7, i7, n5, a6, s6, o6) {
              function h4(h5) {
                (h5.originalEvent || h5).preventDefault();
                var u6 = h5.clientX, c7 = h5.clientY, f5 = l6.doc.documentElement.scrollTop || l6.doc.body.scrollTop, d6 = l6.doc.documentElement.scrollLeft || l6.doc.body.scrollLeft;
                if (this._drag.id = h5.identifier, p5 && h5.touches) {
                  for (var g5, x3 = h5.touches.length; x3--; )
                    if (g5 = h5.touches[x3], this._drag.id = g5.identifier, g5.identifier == this._drag.id) {
                      u6 = g5.clientX, c7 = g5.clientY;
                      break;
                    }
                }
                this._drag.x = u6 + d6, this._drag.y = c7 + f5, !qt.length && e5.mousemove(Ot).mouseup(Vt), qt.push({ el: this, move_scope: a6, start_scope: s6, end_scope: o6 }), i7 && t5.on("raphael.drag.start." + this.id, i7), r7 && t5.on("raphael.drag.move." + this.id, r7), n5 && t5.on("raphael.drag.end." + this.id, n5), t5("raphael.drag.start." + this.id, s6 || a6 || this, this._drag.x, this._drag.y, h5);
              }
              return this._drag = {}, Gt.push({ el: this, start: h4 }), this.mousedown(h4), this;
            }, Wt.onDragOver = function(e6) {
              e6 ? t5.on("raphael.drag.over." + this.id, e6) : t5.unbind("raphael.drag.over." + this.id);
            }, Wt.undrag = function() {
              for (var r7 = Gt.length; r7--; )
                Gt[r7].el == this && (this.unmousedown(Gt[r7].start), Gt.splice(r7, 1), t5.unbind("raphael.drag.*." + this.id));
              !Gt.length && e5.unmousemove(Ot).unmouseup(Vt), qt = [];
            }, i6.circle = function(t6, r7, i7) {
              var n5 = e5._engine.circle(this, t6 || 0, r7 || 0, i7 || 0);
              return this.__set__ && this.__set__.push(n5), n5;
            }, i6.rect = function(t6, r7, i7, n5, a6) {
              var s6 = e5._engine.rect(this, t6 || 0, r7 || 0, i7 || 0, n5 || 0, a6 || 0);
              return this.__set__ && this.__set__.push(s6), s6;
            }, i6.ellipse = function(t6, r7, i7, n5) {
              var a6 = e5._engine.ellipse(this, t6 || 0, r7 || 0, i7 || 0, n5 || 0);
              return this.__set__ && this.__set__.push(a6), a6;
            }, i6.path = function(t6) {
              t6 && !e5.is(t6, "string") && !e5.is(t6[0], A2) && (t6 += d5);
              var r7 = e5._engine.path(e5.format[c6](e5, arguments), this);
              return this.__set__ && this.__set__.push(r7), r7;
            }, i6.image = function(t6, r7, i7, n5, a6) {
              var s6 = e5._engine.image(this, t6 || "about:blank", r7 || 0, i7 || 0, n5 || 0, a6 || 0);
              return this.__set__ && this.__set__.push(s6), s6;
            }, i6.text = function(t6, r7, i7) {
              var n5 = e5._engine.text(this, t6 || 0, r7 || 0, x2(i7));
              return this.__set__ && this.__set__.push(n5), n5;
            }, i6.set = function(t6) {
              !e5.is(t6, "array") && (t6 = Array.prototype.splice.call(arguments, 0, arguments.length));
              var r7 = new ce(t6);
              return this.__set__ && this.__set__.push(r7), r7.paper = this, r7.type = "set", r7;
            }, i6.setStart = function(t6) {
              this.__set__ = t6 || this.set();
            }, i6.setFinish = function(t6) {
              var e6 = this.__set__;
              return delete this.__set__, e6;
            }, i6.getSize = function() {
              var t6 = this.canvas.parentNode;
              return { width: t6.offsetWidth, height: t6.offsetHeight };
            }, i6.setSize = function(t6, r7) {
              return e5._engine.setSize.call(this, t6, r7);
            }, i6.setViewBox = function(t6, r7, i7, n5, a6) {
              return e5._engine.setViewBox.call(this, t6, r7, i7, n5, a6);
            }, i6.top = i6.bottom = null, i6.raphael = e5;
            function Ht() {
              return this.x + g4 + this.y + g4 + this.width + " \xD7 " + this.height;
            }
            i6.getElementByPoint = function(t6, e6) {
              var r7, i7, n5, a6, s6, o6, h4, u6 = this.canvas, c7 = l6.doc.elementFromPoint(t6, e6);
              if (l6.win.opera && "svg" == c7.tagName) {
                var f5 = (i7 = (r7 = u6).getBoundingClientRect(), n5 = r7.ownerDocument, a6 = n5.body, s6 = n5.documentElement, o6 = s6.clientTop || a6.clientTop || 0, h4 = s6.clientLeft || a6.clientLeft || 0, { y: i7.top + (l6.win.pageYOffset || s6.scrollTop || a6.scrollTop) - o6, x: i7.left + (l6.win.pageXOffset || s6.scrollLeft || a6.scrollLeft) - h4 }), p6 = u6.createSVGRect();
                p6.x = t6 - f5.x, p6.y = e6 - f5.y, p6.width = p6.height = 1;
                var d6 = u6.getIntersectionList(p6, null);
                d6.length && (c7 = d6[d6.length - 1]);
              }
              if (!c7)
                return null;
              for (; c7.parentNode && c7 != u6.parentNode && !c7.raphael; )
                c7 = c7.parentNode;
              return c7 == this.canvas.parentNode && (c7 = u6), c7 = c7 && c7.raphael ? this.getById(c7.raphaelid) : null;
            }, i6.getElementsByBBox = function(t6) {
              var r7 = this.set();
              return this.forEach(function(i7) {
                e5.isBBoxIntersect(i7.getBBox(), t6) && r7.push(i7);
              }), r7;
            }, i6.getById = function(t6) {
              for (var e6 = this.bottom; e6; ) {
                if (e6.id == t6)
                  return e6;
                e6 = e6.next;
              }
              return null;
            }, i6.forEach = function(t6, e6) {
              for (var r7 = this.bottom; r7; ) {
                if (false === t6.call(e6, r7))
                  return this;
                r7 = r7.next;
              }
              return this;
            }, i6.getElementsByPoint = function(t6, e6) {
              var r7 = this.set();
              return this.forEach(function(i7) {
                i7.isPointInside(t6, e6) && r7.push(i7);
              }), r7;
            }, Wt.isPointInside = function(t6, r7) {
              var i7 = this.realPath = Z[this.type](this);
              return this.attr("transform") && this.attr("transform").length && (i7 = e5.transformPath(i7, this.attr("transform"))), e5.isPointInsidePath(i7, t6, r7);
            }, Wt.getBBox = function(t6) {
              if (this.removed)
                return {};
              var e6 = this._;
              return t6 ? (!e6.dirty && e6.bboxwt || (this.realPath = Z[this.type](this), e6.bboxwt = yt(this.realPath), e6.bboxwt.toString = Ht, e6.dirty = 0), e6.bboxwt) : ((e6.dirty || e6.dirtyT || !e6.bbox) && (!e6.dirty && this.realPath || (e6.bboxwt = 0, this.realPath = Z[this.type](this)), e6.bbox = yt(Q(this.realPath, this.matrix)), e6.bbox.toString = Ht, e6.dirty = e6.dirtyT = 0), e6.bbox);
            }, Wt.clone = function() {
              if (this.removed)
                return null;
              var t6 = this.paper[this.type]().attr(this.attr());
              return this.__set__ && this.__set__.push(t6), t6;
            }, Wt.glow = function(t6) {
              if ("text" == this.type)
                return null;
              var e6 = { width: ((t6 = t6 || {}).width || 10) + (+this.attr("stroke-width") || 1), fill: t6.fill || false, opacity: null == t6.opacity ? 0.5 : t6.opacity, offsetx: t6.offsetx || 0, offsety: t6.offsety || 0, color: t6.color || "#000" }, r7 = e6.width / 2, i7 = this.paper, n5 = i7.set(), a6 = this.realPath || Z[this.type](this);
              a6 = this.matrix ? Q(a6, this.matrix) : a6;
              for (var s6 = 1; s6 < r7 + 1; s6++)
                n5.push(i7.path(a6).attr({ stroke: e6.color, fill: e6.fill ? e6.color : "none", "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-width": +(e6.width / r7 * s6).toFixed(3), opacity: +(e6.opacity / r7).toFixed(3) }));
              return n5.insertBefore(this).translate(e6.offsetx, e6.offsety);
            };
            var Xt = function(t6, r7, i7, n5, a6, s6, o6, l7, h4) {
              return null == h4 ? dt(t6, r7, i7, n5, a6, s6, o6, l7) : e5.findDotsAtSegment(t6, r7, i7, n5, a6, s6, o6, l7, function(t7, e6, r8, i8, n6, a7, s7, o7, l8) {
                if (!(l8 < 0 || dt(t7, e6, r8, i8, n6, a7, s7, o7) < l8)) {
                  var h5, u6 = 0.5, c7 = 1 - u6;
                  for (h5 = dt(t7, e6, r8, i8, n6, a7, s7, o7, c7); B2(h5 - l8) > 0.01; )
                    h5 = dt(t7, e6, r8, i8, n6, a7, s7, o7, c7 += (h5 < l8 ? 1 : -1) * (u6 /= 2));
                  return c7;
                }
              }(t6, r7, i7, n5, a6, s6, o6, l7, h4));
            }, Ut = function(t6, r7) {
              return function(i7, n5, a6) {
                for (var s6, o6, l7, h4, u6, c7 = "", f5 = {}, p6 = 0, d6 = 0, g5 = (i7 = Tt(i7)).length; d6 < g5; d6++) {
                  if ("M" == (l7 = i7[d6])[0])
                    s6 = +l7[1], o6 = +l7[2];
                  else {
                    if (p6 + (h4 = Xt(s6, o6, l7[1], l7[2], l7[3], l7[4], l7[5], l7[6])) > n5) {
                      if (r7 && !f5.start) {
                        if (c7 += ["C" + (u6 = Xt(s6, o6, l7[1], l7[2], l7[3], l7[4], l7[5], l7[6], n5 - p6)).start.x, u6.start.y, u6.m.x, u6.m.y, u6.x, u6.y], a6)
                          return c7;
                        f5.start = c7, c7 = ["M" + u6.x, u6.y + "C" + u6.n.x, u6.n.y, u6.end.x, u6.end.y, l7[5], l7[6]].join(), p6 += h4, s6 = +l7[5], o6 = +l7[6];
                        continue;
                      }
                      if (!t6 && !r7)
                        return { x: (u6 = Xt(s6, o6, l7[1], l7[2], l7[3], l7[4], l7[5], l7[6], n5 - p6)).x, y: u6.y, alpha: u6.alpha };
                    }
                    p6 += h4, s6 = +l7[5], o6 = +l7[6];
                  }
                  c7 += l7.shift() + l7;
                }
                return f5.end = c7, (u6 = t6 ? p6 : r7 ? f5 : e5.findDotsAtSegment(s6, o6, l7[0], l7[1], l7[2], l7[3], l7[4], l7[5], 1)).alpha && (u6 = { x: u6.x, y: u6.y, alpha: u6.alpha }), u6;
              };
            }, $t = Ut(1), Zt = Ut(), Qt = Ut(0, 1);
            e5.getTotalLength = $t, e5.getPointAtLength = Zt, e5.getSubpath = function(t6, e6, r7) {
              if (this.getTotalLength(t6) - r7 < 1e-6)
                return Qt(t6, e6).end;
              var i7 = Qt(t6, r7, 1);
              return e6 ? Qt(i7, e6).end : i7;
            }, Wt.getTotalLength = function() {
              var t6 = this.getPath();
              if (t6)
                return this.node.getTotalLength ? this.node.getTotalLength() : $t(t6);
            }, Wt.getPointAtLength = function(t6) {
              var e6 = this.getPath();
              if (e6)
                return Zt(e6, t6);
            }, Wt.getPath = function() {
              var t6, r7 = e5._getPath[this.type];
              if ("text" != this.type && "set" != this.type)
                return r7 && (t6 = r7(this)), t6;
            }, Wt.getSubpath = function(t6, r7) {
              var i7 = this.getPath();
              if (i7)
                return e5.getSubpath(i7, t6, r7);
            };
            var Jt = e5.easing_formulas = { linear: function(t6) {
              return t6;
            }, "<": function(t6) {
              return C2(t6, 1.7);
            }, ">": function(t6) {
              return C2(t6, 0.48);
            }, "<>": function(t6) {
              var e6 = 0.48 - t6 / 1.04, r7 = _4.sqrt(0.1734 + e6 * e6), i7 = r7 - e6, n5 = -r7 - e6, a6 = C2(B2(i7), 1 / 3) * (i7 < 0 ? -1 : 1) + C2(B2(n5), 1 / 3) * (n5 < 0 ? -1 : 1) + 0.5;
              return 3 * (1 - a6) * a6 * a6 + a6 * a6 * a6;
            }, backIn: function(t6) {
              var e6 = 1.70158;
              return t6 * t6 * ((e6 + 1) * t6 - e6);
            }, backOut: function(t6) {
              var e6 = 1.70158;
              return (t6 -= 1) * t6 * ((e6 + 1) * t6 + e6) + 1;
            }, elastic: function(t6) {
              return t6 == !!t6 ? t6 : C2(2, -10 * t6) * _4.sin(2 * S * (t6 - 0.075) / 0.3) + 1;
            }, bounce: function(t6) {
              var e6 = 7.5625, r7 = 2.75;
              return t6 < 1 / r7 ? e6 * t6 * t6 : t6 < 2 / r7 ? e6 * (t6 -= 1.5 / r7) * t6 + 0.75 : t6 < 2.5 / r7 ? e6 * (t6 -= 2.25 / r7) * t6 + 0.9375 : e6 * (t6 -= 2.625 / r7) * t6 + 0.984375;
            } };
            Jt.easeIn = Jt["ease-in"] = Jt["<"], Jt.easeOut = Jt["ease-out"] = Jt[">"], Jt.easeInOut = Jt["ease-in-out"] = Jt["<>"], Jt["back-in"] = Jt.backIn, Jt["back-out"] = Jt.backOut;
            var Kt = [], te = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t6) {
              setTimeout(t6, 16);
            }, ee = function() {
              for (var r7 = +/* @__PURE__ */ new Date(), i7 = 0; i7 < Kt.length; i7++) {
                var n5 = Kt[i7];
                if (!n5.el.removed && !n5.paused) {
                  var a6, s6, l7 = r7 - n5.start, h4 = n5.ms, u6 = n5.easing, c7 = n5.from, p6 = n5.diff, d6 = n5.to, x3 = (n5.t, n5.el), v6 = {}, y4 = {};
                  if (n5.initstatus ? (l7 = (n5.initstatus * n5.anim.top - n5.prev) / (n5.percent - n5.prev) * h4, n5.status = n5.initstatus, delete n5.initstatus, n5.stop && Kt.splice(i7--, 1)) : n5.status = (n5.prev + (n5.percent - n5.prev) * (l7 / h4)) / n5.anim.top, !(l7 < 0))
                    if (l7 < h4) {
                      var m4 = u6(l7 / h4);
                      for (var b5 in c7)
                        if (c7[o5](b5)) {
                          switch (I2[b5]) {
                            case T2:
                              a6 = +c7[b5] + m4 * h4 * p6[b5];
                              break;
                            case "colour":
                              a6 = "rgb(" + [re(P2(c7[b5].r + m4 * h4 * p6[b5].r)), re(P2(c7[b5].g + m4 * h4 * p6[b5].g)), re(P2(c7[b5].b + m4 * h4 * p6[b5].b))].join(",") + ")";
                              break;
                            case "path":
                              a6 = [];
                              for (var _5 = 0, w5 = c7[b5].length; _5 < w5; _5++) {
                                a6[_5] = [c7[b5][_5][0]];
                                for (var k4 = 1, B3 = c7[b5][_5].length; k4 < B3; k4++)
                                  a6[_5][k4] = +c7[b5][_5][k4] + m4 * h4 * p6[b5][_5][k4];
                                a6[_5] = a6[_5].join(g4);
                              }
                              a6 = a6.join(g4);
                              break;
                            case "transform":
                              if (p6[b5].real)
                                for (a6 = [], _5 = 0, w5 = c7[b5].length; _5 < w5; _5++)
                                  for (a6[_5] = [c7[b5][_5][0]], k4 = 1, B3 = c7[b5][_5].length; k4 < B3; k4++)
                                    a6[_5][k4] = c7[b5][_5][k4] + m4 * h4 * p6[b5][_5][k4];
                              else {
                                var C3 = function(t6) {
                                  return +c7[b5][t6] + m4 * h4 * p6[b5][t6];
                                };
                                a6 = [["m", C3(0), C3(1), C3(2), C3(3), C3(4), C3(5)]];
                              }
                              break;
                            case "csv":
                              if ("clip-rect" == b5)
                                for (a6 = [], _5 = 4; _5--; )
                                  a6[_5] = +c7[b5][_5] + m4 * h4 * p6[b5][_5];
                              break;
                            default:
                              var S2 = [][f4](c7[b5]);
                              for (a6 = [], _5 = x3.paper.customAttributes[b5].length; _5--; )
                                a6[_5] = +S2[_5] + m4 * h4 * p6[b5][_5];
                          }
                          v6[b5] = a6;
                        }
                      x3.attr(v6), function(e6, r8, i8) {
                        setTimeout(function() {
                          t5("raphael.anim.frame." + e6, r8, i8);
                        });
                      }(x3.id, x3, n5.anim);
                    } else {
                      if (function(r8, i8, n6) {
                        setTimeout(function() {
                          t5("raphael.anim.frame." + i8.id, i8, n6), t5("raphael.anim.finish." + i8.id, i8, n6), e5.is(r8, "function") && r8.call(i8);
                        });
                      }(n5.callback, x3, n5.anim), x3.attr(d6), Kt.splice(i7--, 1), n5.repeat > 1 && !n5.next) {
                        for (s6 in d6)
                          d6[o5](s6) && (y4[s6] = n5.totalOrigin[s6]);
                        n5.el.attr(y4), ae(n5.anim, n5.el, n5.anim.percents[0], null, n5.totalOrigin, n5.repeat - 1);
                      }
                      n5.next && !n5.stop && ae(n5.anim, n5.el, n5.next, null, n5.totalOrigin, n5.repeat);
                    }
                }
              }
              Kt.length && te(ee);
            }, re = function(t6) {
              return t6 > 255 ? 255 : t6 < 0 ? 0 : t6;
            };
            function ie(t6, e6, r7, i7, n5, a6) {
              var s6 = 3 * e6, o6 = 3 * (i7 - e6) - s6, l7 = 1 - s6 - o6, h4 = 3 * r7, u6 = 3 * (n5 - r7) - h4, c7 = 1 - h4 - u6;
              function f5(t7) {
                return ((l7 * t7 + o6) * t7 + s6) * t7;
              }
              return function(t7, e7) {
                var r8 = function(t8, e8) {
                  var r9, i8, n6, a7, h5, u7;
                  for (n6 = t8, u7 = 0; u7 < 8; u7++) {
                    if (a7 = f5(n6) - t8, B2(a7) < e8)
                      return n6;
                    if (B2(h5 = (3 * l7 * n6 + 2 * o6) * n6 + s6) < 1e-6)
                      break;
                    n6 -= a7 / h5;
                  }
                  if (i8 = 1, (n6 = t8) < (r9 = 0))
                    return r9;
                  if (n6 > i8)
                    return i8;
                  for (; r9 < i8; ) {
                    if (a7 = f5(n6), B2(a7 - t8) < e8)
                      return n6;
                    t8 > a7 ? r9 = n6 : i8 = n6, n6 = (i8 - r9) / 2 + r9;
                  }
                  return n6;
                }(t7, e7);
                return ((c7 * r8 + u6) * r8 + h4) * r8;
              }(t6, 1 / (200 * a6));
            }
            function ne(t6, e6) {
              var r7 = [], i7 = {};
              if (this.ms = e6, this.times = 1, t6) {
                for (var n5 in t6)
                  t6[o5](n5) && (i7[z3(n5)] = t6[n5], r7.push(z3(n5)));
                r7.sort(H2);
              }
              this.anim = i7, this.top = r7[r7.length - 1], this.percents = r7;
            }
            function ae(r7, i7, a6, s6, l7, h4) {
              a6 = z3(a6);
              var u6, c7, p6, d6, g5, y4, m4 = r7.ms, b5 = {}, _5 = {}, w5 = {};
              if (s6)
                for (B3 = 0, C3 = Kt.length; B3 < C3; B3++) {
                  var k4 = Kt[B3];
                  if (k4.el.id == i7.id && k4.anim == r7) {
                    k4.percent != a6 ? (Kt.splice(B3, 1), p6 = 1) : c7 = k4, i7.attr(k4.totalOrigin);
                    break;
                  }
                }
              else
                s6 = +_5;
              for (var B3 = 0, C3 = r7.percents.length; B3 < C3; B3++) {
                if (r7.percents[B3] == a6 || r7.percents[B3] > s6 * r7.top) {
                  a6 = r7.percents[B3], g5 = r7.percents[B3 - 1] || 0, m4 = m4 / r7.top * (a6 - g5), d6 = r7.percents[B3 + 1], u6 = r7.anim[a6];
                  break;
                }
                s6 && i7.attr(r7.anim[r7.percents[B3]]);
              }
              if (u6) {
                if (c7)
                  c7.initstatus = s6, c7.start = /* @__PURE__ */ new Date() - c7.ms * s6;
                else {
                  for (var S2 in u6)
                    if (u6[o5](S2) && (I2[o5](S2) || i7.paper.customAttributes[o5](S2)))
                      switch (b5[S2] = i7.attr(S2), null == b5[S2] && (b5[S2] = j3[S2]), _5[S2] = u6[S2], I2[S2]) {
                        case T2:
                          w5[S2] = (_5[S2] - b5[S2]) / m4;
                          break;
                        case "colour":
                          b5[S2] = e5.getRGB(b5[S2]);
                          var A3 = e5.getRGB(_5[S2]);
                          w5[S2] = { r: (A3.r - b5[S2].r) / m4, g: (A3.g - b5[S2].g) / m4, b: (A3.b - b5[S2].b) / m4 };
                          break;
                        case "path":
                          var M3 = Tt(b5[S2], _5[S2]), E3 = M3[1];
                          for (b5[S2] = M3[0], w5[S2] = [], B3 = 0, C3 = b5[S2].length; B3 < C3; B3++) {
                            w5[S2][B3] = [0];
                            for (var N3 = 1, P3 = b5[S2][B3].length; N3 < P3; N3++)
                              w5[S2][B3][N3] = (E3[B3][N3] - b5[S2][B3][N3]) / m4;
                          }
                          break;
                        case "transform":
                          var F4 = i7._, R2 = Lt(F4[S2], _5[S2]);
                          if (R2)
                            for (b5[S2] = R2.from, _5[S2] = R2.to, w5[S2] = [], w5[S2].real = true, B3 = 0, C3 = b5[S2].length; B3 < C3; B3++)
                              for (w5[S2][B3] = [b5[S2][B3][0]], N3 = 1, P3 = b5[S2][B3].length; N3 < P3; N3++)
                                w5[S2][B3][N3] = (_5[S2][B3][N3] - b5[S2][B3][N3]) / m4;
                          else {
                            var D3 = i7.matrix || new Pt(), q3 = { _: { transform: F4.transform }, getBBox: function() {
                              return i7.getBBox(1);
                            } };
                            b5[S2] = [D3.a, D3.b, D3.c, D3.d, D3.e, D3.f], Et(q3, _5[S2]), _5[S2] = q3._.transform, w5[S2] = [(q3.matrix.a - D3.a) / m4, (q3.matrix.b - D3.b) / m4, (q3.matrix.c - D3.c) / m4, (q3.matrix.d - D3.d) / m4, (q3.matrix.e - D3.e) / m4, (q3.matrix.f - D3.f) / m4];
                          }
                          break;
                        case "csv":
                          var O3 = x2(u6[S2])[v5](n4), V2 = x2(b5[S2])[v5](n4);
                          if ("clip-rect" == S2)
                            for (b5[S2] = V2, w5[S2] = [], B3 = V2.length; B3--; )
                              w5[S2][B3] = (O3[B3] - b5[S2][B3]) / m4;
                          _5[S2] = O3;
                          break;
                        default:
                          for (O3 = [][f4](u6[S2]), V2 = [][f4](b5[S2]), w5[S2] = [], B3 = i7.paper.customAttributes[S2].length; B3--; )
                            w5[S2][B3] = ((O3[B3] || 0) - (V2[B3] || 0)) / m4;
                      }
                  var W2 = u6.easing, Y2 = e5.easing_formulas[W2];
                  if (!Y2)
                    if ((Y2 = x2(W2).match(L2)) && 5 == Y2.length) {
                      var G2 = Y2;
                      Y2 = function(t6) {
                        return ie(t6, +G2[1], +G2[2], +G2[3], +G2[4], m4);
                      };
                    } else
                      Y2 = X;
                  if (k4 = { anim: r7, percent: a6, timestamp: y4 = u6.start || r7.start || +/* @__PURE__ */ new Date(), start: y4 + (r7.del || 0), status: 0, initstatus: s6 || 0, stop: false, ms: m4, easing: Y2, from: b5, diff: w5, to: _5, el: i7, callback: u6.callback, prev: g5, next: d6, repeat: h4 || r7.times, origin: i7.attr(), totalOrigin: l7 }, Kt.push(k4), s6 && !c7 && !p6 && (k4.stop = true, k4.start = /* @__PURE__ */ new Date() - m4 * s6, 1 == Kt.length))
                    return ee();
                  p6 && (k4.start = /* @__PURE__ */ new Date() - k4.ms * s6), 1 == Kt.length && te(ee);
                }
                t5("raphael.anim.start." + i7.id, i7, r7);
              }
            }
            function se(t6) {
              for (var e6 = 0; e6 < Kt.length; e6++)
                Kt[e6].el.paper == t6 && Kt.splice(e6--, 1);
            }
            Wt.animateWith = function(t6, r7, i7, n5, a6, s6) {
              if (this.removed)
                return s6 && s6.call(this), this;
              var o6 = i7 instanceof ne ? i7 : e5.animation(i7, n5, a6, s6);
              ae(o6, this, o6.percents[0], null, this.attr());
              for (var l7 = 0, h4 = Kt.length; l7 < h4; l7++)
                if (Kt[l7].anim == r7 && Kt[l7].el == t6) {
                  Kt[h4 - 1].start = Kt[l7].start;
                  break;
                }
              return this;
            }, Wt.onAnimation = function(e6) {
              return e6 ? t5.on("raphael.anim.frame." + this.id, e6) : t5.unbind("raphael.anim.frame." + this.id), this;
            }, ne.prototype.delay = function(t6) {
              var e6 = new ne(this.anim, this.ms);
              return e6.times = this.times, e6.del = +t6 || 0, e6;
            }, ne.prototype.repeat = function(t6) {
              var e6 = new ne(this.anim, this.ms);
              return e6.del = this.del, e6.times = _4.floor(w4(t6, 0)) || 1, e6;
            }, e5.animation = function(t6, r7, i7, n5) {
              if (t6 instanceof ne)
                return t6;
              !e5.is(i7, "function") && i7 || (n5 = n5 || i7 || null, i7 = null), t6 = Object(t6), r7 = +r7 || 0;
              var a6, s6, l7 = {};
              for (s6 in t6)
                t6[o5](s6) && z3(s6) != s6 && z3(s6) + "%" != s6 && (a6 = true, l7[s6] = t6[s6]);
              if (a6)
                return i7 && (l7.easing = i7), n5 && (l7.callback = n5), new ne({ 100: l7 }, r7);
              if (n5) {
                var h4 = 0;
                for (var u6 in t6) {
                  var c7 = F3(u6);
                  t6[o5](u6) && c7 > h4 && (h4 = c7);
                }
                !t6[h4 += "%"].callback && (t6[h4].callback = n5);
              }
              return new ne(t6, r7);
            }, Wt.animate = function(t6, r7, i7, n5) {
              if (this.removed)
                return n5 && n5.call(this), this;
              var a6 = t6 instanceof ne ? t6 : e5.animation(t6, r7, i7, n5);
              return ae(a6, this, a6.percents[0], null, this.attr()), this;
            }, Wt.setTime = function(t6, e6) {
              return t6 && null != e6 && this.status(t6, k3(e6, t6.ms) / t6.ms), this;
            }, Wt.status = function(t6, e6) {
              var r7, i7, n5 = [], a6 = 0;
              if (null != e6)
                return ae(t6, this, -1, k3(e6, 1)), this;
              for (r7 = Kt.length; a6 < r7; a6++)
                if ((i7 = Kt[a6]).el.id == this.id && (!t6 || i7.anim == t6)) {
                  if (t6)
                    return i7.status;
                  n5.push({ anim: i7.anim, status: i7.status });
                }
              return t6 ? 0 : n5;
            }, Wt.pause = function(e6) {
              for (var r7 = 0; r7 < Kt.length; r7++)
                Kt[r7].el.id != this.id || e6 && Kt[r7].anim != e6 || false !== t5("raphael.anim.pause." + this.id, this, Kt[r7].anim) && (Kt[r7].paused = true);
              return this;
            }, Wt.resume = function(e6) {
              for (var r7 = 0; r7 < Kt.length; r7++)
                if (Kt[r7].el.id == this.id && (!e6 || Kt[r7].anim == e6)) {
                  var i7 = Kt[r7];
                  false !== t5("raphael.anim.resume." + this.id, this, i7.anim) && (delete i7.paused, this.status(i7.anim, i7.status));
                }
              return this;
            }, Wt.stop = function(e6) {
              for (var r7 = 0; r7 < Kt.length; r7++)
                Kt[r7].el.id != this.id || e6 && Kt[r7].anim != e6 || false !== t5("raphael.anim.stop." + this.id, this, Kt[r7].anim) && Kt.splice(r7--, 1);
              return this;
            }, t5.on("raphael.remove", se), t5.on("raphael.clear", se), Wt.toString = function() {
              return "Rapha\xEBl\u2019s object";
            };
            var oe, le, he, ue, ce = function(t6) {
              if (this.items = [], this.length = 0, this.type = "set", t6)
                for (var e6 = 0, r7 = t6.length; e6 < r7; e6++)
                  !t6[e6] || t6[e6].constructor != Wt.constructor && t6[e6].constructor != ce || (this[this.items.length] = this.items[this.items.length] = t6[e6], this.length++);
            }, fe = ce.prototype;
            for (var pe in fe.push = function() {
              for (var t6, e6, r7 = 0, i7 = arguments.length; r7 < i7; r7++)
                !(t6 = arguments[r7]) || t6.constructor != Wt.constructor && t6.constructor != ce || (this[e6 = this.items.length] = this.items[e6] = t6, this.length++);
              return this;
            }, fe.pop = function() {
              return this.length && delete this[this.length--], this.items.pop();
            }, fe.forEach = function(t6, e6) {
              for (var r7 = 0, i7 = this.items.length; r7 < i7; r7++)
                if (false === t6.call(e6, this.items[r7], r7))
                  return this;
              return this;
            }, Wt)
              Wt[o5](pe) && (fe[pe] = function(t6) {
                return function() {
                  var e6 = arguments;
                  return this.forEach(function(r7) {
                    r7[t6][c6](r7, e6);
                  });
                };
              }(pe));
            return fe.attr = function(t6, r7) {
              if (t6 && e5.is(t6, A2) && e5.is(t6[0], "object"))
                for (var i7 = 0, n5 = t6.length; i7 < n5; i7++)
                  this.items[i7].attr(t6[i7]);
              else
                for (var a6 = 0, s6 = this.items.length; a6 < s6; a6++)
                  this.items[a6].attr(t6, r7);
              return this;
            }, fe.clear = function() {
              for (; this.length; )
                this.pop();
            }, fe.splice = function(t6, e6, r7) {
              t6 = t6 < 0 ? w4(this.length + t6, 0) : t6, e6 = w4(0, k3(this.length - t6, e6));
              var i7, n5 = [], a6 = [], s6 = [];
              for (i7 = 2; i7 < arguments.length; i7++)
                s6.push(arguments[i7]);
              for (i7 = 0; i7 < e6; i7++)
                a6.push(this[t6 + i7]);
              for (; i7 < this.length - t6; i7++)
                n5.push(this[t6 + i7]);
              var o6 = s6.length;
              for (i7 = 0; i7 < o6 + n5.length; i7++)
                this.items[t6 + i7] = this[t6 + i7] = i7 < o6 ? s6[i7] : n5[i7 - o6];
              for (i7 = this.items.length = this.length -= e6 - o6; this[i7]; )
                delete this[i7++];
              return new ce(a6);
            }, fe.exclude = function(t6) {
              for (var e6 = 0, r7 = this.length; e6 < r7; e6++)
                if (this[e6] == t6)
                  return this.splice(e6, 1), true;
            }, fe.animate = function(t6, r7, i7, n5) {
              (e5.is(i7, "function") || !i7) && (n5 = i7 || null);
              var a6, s6, o6 = this.items.length, l7 = o6, h4 = this;
              if (!o6)
                return this;
              n5 && (s6 = function() {
                !--o6 && n5.call(h4);
              }), i7 = e5.is(i7, "string") ? i7 : s6;
              var u6 = e5.animation(t6, r7, i7, s6);
              for (a6 = this.items[--l7].animate(u6); l7--; )
                this.items[l7] && !this.items[l7].removed && this.items[l7].animateWith(a6, u6, u6), this.items[l7] && !this.items[l7].removed || o6--;
              return this;
            }, fe.insertAfter = function(t6) {
              for (var e6 = this.items.length; e6--; )
                this.items[e6].insertAfter(t6);
              return this;
            }, fe.getBBox = function() {
              for (var t6 = [], e6 = [], r7 = [], i7 = [], n5 = this.items.length; n5--; )
                if (!this.items[n5].removed) {
                  var a6 = this.items[n5].getBBox();
                  t6.push(a6.x), e6.push(a6.y), r7.push(a6.x + a6.width), i7.push(a6.y + a6.height);
                }
              return { x: t6 = k3[c6](0, t6), y: e6 = k3[c6](0, e6), x2: r7 = w4[c6](0, r7), y2: i7 = w4[c6](0, i7), width: r7 - t6, height: i7 - e6 };
            }, fe.clone = function(t6) {
              t6 = this.paper.set();
              for (var e6 = 0, r7 = this.items.length; e6 < r7; e6++)
                t6.push(this.items[e6].clone());
              return t6;
            }, fe.toString = function() {
              return "Rapha\xEBl\u2018s set";
            }, fe.glow = function(t6) {
              var e6 = this.paper.set();
              return this.forEach(function(r7, i7) {
                var n5 = r7.glow(t6);
                null != n5 && n5.forEach(function(t7, r8) {
                  e6.push(t7);
                });
              }), e6;
            }, fe.isPointInside = function(t6, e6) {
              var r7 = false;
              return this.forEach(function(i7) {
                if (i7.isPointInside(t6, e6))
                  return r7 = true, false;
              }), r7;
            }, e5.registerFont = function(t6) {
              if (!t6.face)
                return t6;
              this.fonts = this.fonts || {};
              var e6 = { w: t6.w, face: {}, glyphs: {} }, r7 = t6.face["font-family"];
              for (var i7 in t6.face)
                t6.face[o5](i7) && (e6.face[i7] = t6.face[i7]);
              if (this.fonts[r7] ? this.fonts[r7].push(e6) : this.fonts[r7] = [e6], !t6.svg) {
                for (var n5 in e6.face["units-per-em"] = F3(t6.face["units-per-em"], 10), t6.glyphs)
                  if (t6.glyphs[o5](n5)) {
                    var a6 = t6.glyphs[n5];
                    if (e6.glyphs[n5] = { w: a6.w, k: {}, d: a6.d && "M" + a6.d.replace(/[mlcxtrv]/g, function(t7) {
                      return { l: "L", c: "C", x: "z", t: "m", r: "l", v: "c" }[t7] || "M";
                    }) + "z" }, a6.k)
                      for (var s6 in a6.k)
                        a6[o5](s6) && (e6.glyphs[n5].k[s6] = a6.k[s6]);
                  }
              }
              return t6;
            }, i6.getFont = function(t6, r7, i7, n5) {
              if (n5 = n5 || "normal", i7 = i7 || "normal", r7 = +r7 || { normal: 400, bold: 700, lighter: 300, bolder: 800 }[r7] || 400, e5.fonts) {
                var a6, s6 = e5.fonts[t6];
                if (!s6) {
                  var l7 = new RegExp("(^|\\s)" + t6.replace(/[^\w\d\s+!~.:_-]/g, d5) + "(\\s|$)", "i");
                  for (var h4 in e5.fonts)
                    if (e5.fonts[o5](h4) && l7.test(h4)) {
                      s6 = e5.fonts[h4];
                      break;
                    }
                }
                if (s6)
                  for (var u6 = 0, c7 = s6.length; u6 < c7 && ((a6 = s6[u6]).face["font-weight"] != r7 || a6.face["font-style"] != i7 && a6.face["font-style"] || a6.face["font-stretch"] != n5); u6++)
                    ;
                return a6;
              }
            }, i6.print = function(t6, r7, i7, a6, s6, o6, l7, h4) {
              o6 = o6 || "middle", l7 = w4(k3(l7 || 0, 1), -1), h4 = w4(k3(h4 || 1, 3), 1);
              var u6, c7 = x2(i7)[v5](d5), f5 = 0, p6 = 0, g5 = d5;
              if (e5.is(a6, "string") && (a6 = this.getFont(a6)), a6) {
                u6 = (s6 || 16) / a6.face["units-per-em"];
                for (var y4 = a6.face.bbox[v5](n4), m4 = +y4[0], b5 = y4[3] - y4[1], _5 = 0, B3 = +y4[1] + ("baseline" == o6 ? b5 + +a6.face.descent : b5 / 2), C3 = 0, S2 = c7.length; C3 < S2; C3++) {
                  if ("\n" == c7[C3])
                    f5 = 0, A3 = 0, p6 = 0, _5 += b5 * h4;
                  else {
                    var T3 = p6 && a6.glyphs[c7[C3 - 1]] || {}, A3 = a6.glyphs[c7[C3]];
                    f5 += p6 ? (T3.w || a6.w) + (T3.k && T3.k[c7[C3]] || 0) + a6.w * l7 : 0, p6 = 1;
                  }
                  A3 && A3.d && (g5 += e5.transformPath(A3.d, ["t", f5 * u6, _5 * u6, "s", u6, u6, m4, B3, "t", (t6 - m4) / u6, (r7 - B3) / u6]));
                }
              }
              return this.path(g5).attr({ fill: "#000", stroke: "none" });
            }, i6.add = function(t6) {
              if (e5.is(t6, "array"))
                for (var r7, i7 = this.set(), n5 = 0, s6 = t6.length; n5 < s6; n5++)
                  r7 = t6[n5] || {}, a5[o5](r7.type) && i7.push(this[r7.type]().attr(r7));
              return i7;
            }, e5.format = function(t6, r7) {
              var i7 = e5.is(r7, A2) ? [0][f4](r7) : arguments;
              return t6 && e5.is(t6, "string") && i7.length - 1 && (t6 = t6.replace(s5, function(t7, e6) {
                return null == i7[++e6] ? d5 : i7[e6];
              })), t6 || d5;
            }, e5.fullfill = (oe = /\{([^\}]+)\}/g, le = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, function(t6, e6) {
              return String(t6).replace(oe, function(t7, r7) {
                return function(t8, e7, r8) {
                  var i7 = r8;
                  return e7.replace(le, function(t9, e8, r9, n5, a6) {
                    e8 = e8 || n5, i7 && (e8 in i7 && (i7 = i7[e8]), "function" == typeof i7 && a6 && (i7 = i7()));
                  }), i7 = (null == i7 || i7 == r8 ? t8 : i7) + "";
                }(t7, r7, e6);
              });
            }), e5.ninja = function() {
              if (h3.was)
                l6.win.Raphael = h3.is;
              else {
                window.Raphael = void 0;
                try {
                  delete window.Raphael;
                } catch (t6) {
                }
              }
              return e5;
            }, e5.st = fe, t5.on("raphael.DOMload", function() {
              r6 = true;
            }), null == (he = document).readyState && he.addEventListener && (he.addEventListener("DOMContentLoaded", ue = function() {
              he.removeEventListener("DOMContentLoaded", ue, false), he.readyState = "complete";
            }, false), he.readyState = "loading"), function t6() {
              /in/.test(he.readyState) ? setTimeout(t6, 9) : e5.eve("raphael.DOMload");
            }(), e5;
          }.apply(e4, i5)) || (t4.exports = n3);
        }, function(t4, e4, r5) {
          var i5, n3;
          i5 = [r5(0), r5(3), r5(4)], void 0 === (n3 = function(t5) {
            return t5;
          }.apply(e4, i5)) || (t4.exports = n3);
        }, function(t4, e4, r5) {
          var i5, n3, a5, s5, o5, l6, h3, u5, c6, f4, p5, d5, g4, x2;
          s5 = "hasOwnProperty", o5 = /[\.\/]/, l6 = /\s*,\s*/, h3 = function(t5, e5) {
            return t5 - e5;
          }, u5 = { n: {} }, c6 = function() {
            for (var t5 = 0, e5 = this.length; t5 < e5; t5++)
              if (void 0 !== this[t5])
                return this[t5];
          }, f4 = function() {
            for (var t5 = this.length; --t5; )
              if (void 0 !== this[t5])
                return this[t5];
          }, p5 = Object.prototype.toString, d5 = String, g4 = Array.isArray || function(t5) {
            return t5 instanceof Array || "[object Array]" == p5.call(t5);
          }, (x2 = function(t5, e5) {
            var r6, i6 = a5, s6 = Array.prototype.slice.call(arguments, 2), o6 = x2.listeners(t5), l7 = 0, u6 = [], p6 = {}, d6 = [], g5 = n3;
            d6.firstDefined = c6, d6.lastDefined = f4, n3 = t5, a5 = 0;
            for (var v5 = 0, y3 = o6.length; v5 < y3; v5++)
              "zIndex" in o6[v5] && (u6.push(o6[v5].zIndex), o6[v5].zIndex < 0 && (p6[o6[v5].zIndex] = o6[v5]));
            for (u6.sort(h3); u6[l7] < 0; )
              if (r6 = p6[u6[l7++]], d6.push(r6.apply(e5, s6)), a5)
                return a5 = i6, d6;
            for (v5 = 0; v5 < y3; v5++)
              if ("zIndex" in (r6 = o6[v5]))
                if (r6.zIndex == u6[l7]) {
                  if (d6.push(r6.apply(e5, s6)), a5)
                    break;
                  do {
                    if ((r6 = p6[u6[++l7]]) && d6.push(r6.apply(e5, s6)), a5)
                      break;
                  } while (r6);
                } else
                  p6[r6.zIndex] = r6;
              else if (d6.push(r6.apply(e5, s6)), a5)
                break;
            return a5 = i6, n3 = g5, d6;
          })._events = u5, x2.listeners = function(t5) {
            var e5, r6, i6, n4, a6, s6, l7, h4, c7 = g4(t5) ? t5 : t5.split(o5), f5 = u5, p6 = [f5], d6 = [];
            for (n4 = 0, a6 = c7.length; n4 < a6; n4++) {
              for (h4 = [], s6 = 0, l7 = p6.length; s6 < l7; s6++)
                for (r6 = [(f5 = p6[s6].n)[c7[n4]], f5["*"]], i6 = 2; i6--; )
                  (e5 = r6[i6]) && (h4.push(e5), d6 = d6.concat(e5.f || []));
              p6 = h4;
            }
            return d6;
          }, x2.separator = function(t5) {
            t5 ? (t5 = "[" + (t5 = d5(t5).replace(/(?=[\.\^\]\[\-])/g, "\\")) + "]", o5 = new RegExp(t5)) : o5 = /[\.\/]/;
          }, x2.on = function(t5, e5) {
            if ("function" != typeof e5)
              return function() {
              };
            for (var r6 = g4(t5) ? g4(t5[0]) ? t5 : [t5] : d5(t5).split(l6), i6 = 0, n4 = r6.length; i6 < n4; i6++)
              !function(t6) {
                for (var r7, i7 = g4(t6) ? t6 : d5(t6).split(o5), n5 = u5, a6 = 0, s6 = i7.length; a6 < s6; a6++)
                  n5 = (n5 = n5.n).hasOwnProperty(i7[a6]) && n5[i7[a6]] || (n5[i7[a6]] = { n: {} });
                for (n5.f = n5.f || [], a6 = 0, s6 = n5.f.length; a6 < s6; a6++)
                  if (n5.f[a6] == e5) {
                    r7 = true;
                    break;
                  }
                !r7 && n5.f.push(e5);
              }(r6[i6]);
            return function(t6) {
              +t6 == +t6 && (e5.zIndex = +t6);
            };
          }, x2.f = function(t5) {
            var e5 = [].slice.call(arguments, 1);
            return function() {
              x2.apply(null, [t5, null].concat(e5).concat([].slice.call(arguments, 0)));
            };
          }, x2.stop = function() {
            a5 = 1;
          }, x2.nt = function(t5) {
            var e5 = g4(n3) ? n3.join(".") : n3;
            return t5 ? new RegExp("(?:\\.|\\/|^)" + t5 + "(?:\\.|\\/|$)").test(e5) : e5;
          }, x2.nts = function() {
            return g4(n3) ? n3 : n3.split(o5);
          }, x2.off = x2.unbind = function(t5, e5) {
            if (t5) {
              var r6 = g4(t5) ? g4(t5[0]) ? t5 : [t5] : d5(t5).split(l6);
              if (r6.length > 1)
                for (var i6 = 0, n4 = r6.length; i6 < n4; i6++)
                  x2.off(r6[i6], e5);
              else {
                r6 = g4(t5) ? t5 : d5(t5).split(o5);
                var a6, h4, c7, f5, p6, v5 = [u5];
                for (i6 = 0, n4 = r6.length; i6 < n4; i6++)
                  for (f5 = 0; f5 < v5.length; f5 += c7.length - 2) {
                    if (c7 = [f5, 1], a6 = v5[f5].n, "*" != r6[i6])
                      a6[r6[i6]] && c7.push(a6[r6[i6]]);
                    else
                      for (h4 in a6)
                        a6[s5](h4) && c7.push(a6[h4]);
                    v5.splice.apply(v5, c7);
                  }
                for (i6 = 0, n4 = v5.length; i6 < n4; i6++)
                  for (a6 = v5[i6]; a6.n; ) {
                    if (e5) {
                      if (a6.f) {
                        for (f5 = 0, p6 = a6.f.length; f5 < p6; f5++)
                          if (a6.f[f5] == e5) {
                            a6.f.splice(f5, 1);
                            break;
                          }
                        !a6.f.length && delete a6.f;
                      }
                      for (h4 in a6.n)
                        if (a6.n[s5](h4) && a6.n[h4].f) {
                          var y3 = a6.n[h4].f;
                          for (f5 = 0, p6 = y3.length; f5 < p6; f5++)
                            if (y3[f5] == e5) {
                              y3.splice(f5, 1);
                              break;
                            }
                          !y3.length && delete a6.n[h4].f;
                        }
                    } else
                      for (h4 in delete a6.f, a6.n)
                        a6.n[s5](h4) && a6.n[h4].f && delete a6.n[h4].f;
                    a6 = a6.n;
                  }
              }
            } else
              x2._events = u5 = { n: {} };
          }, x2.once = function(t5, e5) {
            var r6 = function() {
              return x2.off(t5, r6), e5.apply(this, arguments);
            };
            return x2.on(t5, r6);
          }, x2.version = "0.5.0", x2.toString = function() {
            return "You are running Eve 0.5.0";
          }, t4.exports ? t4.exports = x2 : void 0 === (i5 = function() {
            return x2;
          }.apply(e4, [])) || (t4.exports = i5);
        }, function(t4, e4, r5) {
          var i5, n3;
          i5 = [r5(0)], void 0 === (n3 = function(t5) {
            if (!t5 || t5.svg) {
              var e5 = "hasOwnProperty", r6 = String, i6 = parseFloat, n4 = parseInt, a5 = Math, s5 = a5.max, o5 = a5.abs, l6 = a5.pow, h3 = /[, ]+/, u5 = t5.eve, c6 = "", f4 = " ", p5 = "http://www.w3.org/1999/xlink", d5 = { block: "M5,0 0,2.5 5,5z", classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z", diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z", open: "M6,1 1,3.5 6,6", oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z" }, g4 = {};
              t5.toString = function() {
                return "Your browser supports SVG.\nYou are running Rapha\xEBl " + this.version;
              };
              var x2 = function(i7, n5) {
                if (n5)
                  for (var a6 in "string" == typeof i7 && (i7 = x2(i7)), n5)
                    n5[e5](a6) && ("xlink:" == a6.substring(0, 6) ? i7.setAttributeNS(p5, a6.substring(6), r6(n5[a6])) : i7.setAttribute(a6, r6(n5[a6])));
                else
                  (i7 = t5._g.doc.createElementNS("http://www.w3.org/2000/svg", i7)).style && (i7.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
                return i7;
              }, v5 = function(e6, n5) {
                var h4 = "linear", u6 = e6.id + n5, f5 = 0.5, p6 = 0.5, d6 = e6.node, g5 = e6.paper, v6 = d6.style, m4 = t5._g.doc.getElementById(u6);
                if (!m4) {
                  if (n5 = (n5 = r6(n5).replace(t5._radial_gradient, function(t6, e7, r7) {
                    if (h4 = "radial", e7 && r7) {
                      f5 = i6(e7);
                      var n6 = 2 * ((p6 = i6(r7)) > 0.5) - 1;
                      l6(f5 - 0.5, 2) + l6(p6 - 0.5, 2) > 0.25 && (p6 = a5.sqrt(0.25 - l6(f5 - 0.5, 2)) * n6 + 0.5) && 0.5 != p6 && (p6 = p6.toFixed(5) - 1e-5 * n6);
                    }
                    return c6;
                  })).split(/\s*\-\s*/), "linear" == h4) {
                    var b5 = n5.shift();
                    if (b5 = -i6(b5), isNaN(b5))
                      return null;
                    var _5 = [0, 0, a5.cos(t5.rad(b5)), a5.sin(t5.rad(b5))], w5 = 1 / (s5(o5(_5[2]), o5(_5[3])) || 1);
                    _5[2] *= w5, _5[3] *= w5, _5[2] < 0 && (_5[0] = -_5[2], _5[2] = 0), _5[3] < 0 && (_5[1] = -_5[3], _5[3] = 0);
                  }
                  var k4 = t5._parseDots(n5);
                  if (!k4)
                    return null;
                  if (u6 = u6.replace(/[\(\)\s,\xb0#]/g, "_"), e6.gradient && u6 != e6.gradient.id && (g5.defs.removeChild(e6.gradient), delete e6.gradient), !e6.gradient) {
                    m4 = x2(h4 + "Gradient", { id: u6 }), e6.gradient = m4, x2(m4, "radial" == h4 ? { fx: f5, fy: p6 } : { x1: _5[0], y1: _5[1], x2: _5[2], y2: _5[3], gradientTransform: e6.matrix.invert() }), g5.defs.appendChild(m4);
                    for (var B3 = 0, C3 = k4.length; B3 < C3; B3++)
                      m4.appendChild(x2("stop", { offset: k4[B3].offset ? k4[B3].offset : B3 ? "100%" : "0%", "stop-color": k4[B3].color || "#fff", "stop-opacity": isFinite(k4[B3].opacity) ? k4[B3].opacity : 1 }));
                  }
                }
                return x2(d6, { fill: y3(u6), opacity: 1, "fill-opacity": 1 }), v6.fill = c6, v6.opacity = 1, v6.fillOpacity = 1, 1;
              }, y3 = function(t6) {
                if ((e6 = document.documentMode) && (9 === e6 || 10 === e6))
                  return "url('#" + t6 + "')";
                var e6, r7 = document.location;
                return "url('" + (r7.protocol + "//" + r7.host + r7.pathname + r7.search) + "#" + t6 + "')";
              }, m3 = function(t6) {
                var e6 = t6.getBBox(1);
                x2(t6.pattern, { patternTransform: t6.matrix.invert() + " translate(" + e6.x + "," + e6.y + ")" });
              }, b4 = function(i7, n5, a6) {
                if ("path" == i7.type) {
                  for (var s6, o6, l7, h4, u6, f5 = r6(n5).toLowerCase().split("-"), p6 = i7.paper, v6 = a6 ? "end" : "start", y4 = i7.node, m4 = i7.attrs, b5 = m4["stroke-width"], _5 = f5.length, w5 = "classic", k4 = 3, B3 = 3, C3 = 5; _5--; )
                    switch (f5[_5]) {
                      case "block":
                      case "classic":
                      case "oval":
                      case "diamond":
                      case "open":
                      case "none":
                        w5 = f5[_5];
                        break;
                      case "wide":
                        B3 = 5;
                        break;
                      case "narrow":
                        B3 = 2;
                        break;
                      case "long":
                        k4 = 5;
                        break;
                      case "short":
                        k4 = 2;
                    }
                  if ("open" == w5 ? (k4 += 2, B3 += 2, C3 += 2, l7 = 1, h4 = a6 ? 4 : 1, u6 = { fill: "none", stroke: m4.stroke }) : (h4 = l7 = k4 / 2, u6 = { fill: m4.stroke, stroke: "none" }), i7._.arrows ? a6 ? (i7._.arrows.endPath && g4[i7._.arrows.endPath]--, i7._.arrows.endMarker && g4[i7._.arrows.endMarker]--) : (i7._.arrows.startPath && g4[i7._.arrows.startPath]--, i7._.arrows.startMarker && g4[i7._.arrows.startMarker]--) : i7._.arrows = {}, "none" != w5) {
                    var S2 = "raphael-marker-" + w5, T3 = "raphael-marker-" + v6 + w5 + k4 + B3 + "-obj" + i7.id;
                    t5._g.doc.getElementById(S2) ? g4[S2]++ : (p6.defs.appendChild(x2(x2("path"), { "stroke-linecap": "round", d: d5[w5], id: S2 })), g4[S2] = 1);
                    var A3, M3 = t5._g.doc.getElementById(T3);
                    M3 ? (g4[T3]++, A3 = M3.getElementsByTagName("use")[0]) : (M3 = x2(x2("marker"), { id: T3, markerHeight: B3, markerWidth: k4, orient: "auto", refX: h4, refY: B3 / 2 }), A3 = x2(x2("use"), { "xlink:href": "#" + S2, transform: (a6 ? "rotate(180 " + k4 / 2 + " " + B3 / 2 + ") " : c6) + "scale(" + k4 / C3 + "," + B3 / C3 + ")", "stroke-width": (1 / ((k4 / C3 + B3 / C3) / 2)).toFixed(4) }), M3.appendChild(A3), p6.defs.appendChild(M3), g4[T3] = 1), x2(A3, u6);
                    var E2 = l7 * ("diamond" != w5 && "oval" != w5);
                    a6 ? (s6 = i7._.arrows.startdx * b5 || 0, o6 = t5.getTotalLength(m4.path) - E2 * b5) : (s6 = E2 * b5, o6 = t5.getTotalLength(m4.path) - (i7._.arrows.enddx * b5 || 0)), (u6 = {})["marker-" + v6] = "url(#" + T3 + ")", (o6 || s6) && (u6.d = t5.getSubpath(m4.path, s6, o6)), x2(y4, u6), i7._.arrows[v6 + "Path"] = S2, i7._.arrows[v6 + "Marker"] = T3, i7._.arrows[v6 + "dx"] = E2, i7._.arrows[v6 + "Type"] = w5, i7._.arrows[v6 + "String"] = n5;
                  } else
                    a6 ? (s6 = i7._.arrows.startdx * b5 || 0, o6 = t5.getTotalLength(m4.path) - s6) : (s6 = 0, o6 = t5.getTotalLength(m4.path) - (i7._.arrows.enddx * b5 || 0)), i7._.arrows[v6 + "Path"] && x2(y4, { d: t5.getSubpath(m4.path, s6, o6) }), delete i7._.arrows[v6 + "Path"], delete i7._.arrows[v6 + "Marker"], delete i7._.arrows[v6 + "dx"], delete i7._.arrows[v6 + "Type"], delete i7._.arrows[v6 + "String"];
                  for (u6 in g4)
                    if (g4[e5](u6) && !g4[u6]) {
                      var N2 = t5._g.doc.getElementById(u6);
                      N2 && N2.parentNode.removeChild(N2);
                    }
                }
              }, _4 = { "-": [3, 1], ".": [1, 1], "-.": [3, 1, 1, 1], "-..": [3, 1, 1, 1, 1, 1], ". ": [1, 3], "- ": [4, 3], "--": [8, 3], "- .": [4, 3, 1, 3], "--.": [8, 3, 1, 3], "--..": [8, 3, 1, 3, 1, 3] }, w4 = function(t6, e6, i7) {
                if (e6 = _4[r6(e6).toLowerCase()]) {
                  for (var n5 = t6.attrs["stroke-width"] || "1", a6 = { round: n5, square: n5, butt: 0 }[t6.attrs["stroke-linecap"] || i7["stroke-linecap"]] || 0, s6 = [], o6 = e6.length; o6--; )
                    s6[o6] = e6[o6] * n5 + (o6 % 2 ? 1 : -1) * a6;
                  x2(t6.node, { "stroke-dasharray": s6.join(",") });
                } else
                  x2(t6.node, { "stroke-dasharray": "none" });
              }, k3 = function(i7, a6) {
                var l7 = i7.node, u6 = i7.attrs, f5 = l7.style.visibility;
                for (var d6 in l7.style.visibility = "hidden", a6)
                  if (a6[e5](d6)) {
                    if (!t5._availableAttrs[e5](d6))
                      continue;
                    var g5 = a6[d6];
                    switch (u6[d6] = g5, d6) {
                      case "blur":
                        i7.blur(g5);
                        break;
                      case "title":
                        var y4 = l7.getElementsByTagName("title");
                        if (y4.length && (y4 = y4[0]))
                          y4.firstChild.nodeValue = g5;
                        else {
                          y4 = x2("title");
                          var _5 = t5._g.doc.createTextNode(g5);
                          y4.appendChild(_5), l7.appendChild(y4);
                        }
                        break;
                      case "href":
                      case "target":
                        var k4 = l7.parentNode;
                        if ("a" != k4.tagName.toLowerCase()) {
                          var C3 = x2("a");
                          k4.insertBefore(C3, l7), C3.appendChild(l7), k4 = C3;
                        }
                        "target" == d6 ? k4.setAttributeNS(p5, "show", "blank" == g5 ? "new" : g5) : k4.setAttributeNS(p5, d6, g5);
                        break;
                      case "cursor":
                        l7.style.cursor = g5;
                        break;
                      case "transform":
                        i7.transform(g5);
                        break;
                      case "arrow-start":
                        b4(i7, g5);
                        break;
                      case "arrow-end":
                        b4(i7, g5, 1);
                        break;
                      case "clip-rect":
                        var S2 = r6(g5).split(h3);
                        if (4 == S2.length) {
                          i7.clip && i7.clip.parentNode.parentNode.removeChild(i7.clip.parentNode);
                          var T3 = x2("clipPath"), A3 = x2("rect");
                          T3.id = t5.createUUID(), x2(A3, { x: S2[0], y: S2[1], width: S2[2], height: S2[3] }), T3.appendChild(A3), i7.paper.defs.appendChild(T3), x2(l7, { "clip-path": "url(#" + T3.id + ")" }), i7.clip = A3;
                        }
                        if (!g5) {
                          var M3 = l7.getAttribute("clip-path");
                          if (M3) {
                            var E2 = t5._g.doc.getElementById(M3.replace(/(^url\(#|\)$)/g, c6));
                            E2 && E2.parentNode.removeChild(E2), x2(l7, { "clip-path": c6 }), delete i7.clip;
                          }
                        }
                        break;
                      case "path":
                        "path" == i7.type && (x2(l7, { d: g5 ? u6.path = t5._pathToAbsolute(g5) : "M0,0" }), i7._.dirty = 1, i7._.arrows && ("startString" in i7._.arrows && b4(i7, i7._.arrows.startString), "endString" in i7._.arrows && b4(i7, i7._.arrows.endString, 1)));
                        break;
                      case "width":
                        if (l7.setAttribute(d6, g5), i7._.dirty = 1, !u6.fx)
                          break;
                        d6 = "x", g5 = u6.x;
                      case "x":
                        u6.fx && (g5 = -u6.x - (u6.width || 0));
                      case "rx":
                        if ("rx" == d6 && "rect" == i7.type)
                          break;
                      case "cx":
                        l7.setAttribute(d6, g5), i7.pattern && m3(i7), i7._.dirty = 1;
                        break;
                      case "height":
                        if (l7.setAttribute(d6, g5), i7._.dirty = 1, !u6.fy)
                          break;
                        d6 = "y", g5 = u6.y;
                      case "y":
                        u6.fy && (g5 = -u6.y - (u6.height || 0));
                      case "ry":
                        if ("ry" == d6 && "rect" == i7.type)
                          break;
                      case "cy":
                        l7.setAttribute(d6, g5), i7.pattern && m3(i7), i7._.dirty = 1;
                        break;
                      case "r":
                        "rect" == i7.type ? x2(l7, { rx: g5, ry: g5 }) : l7.setAttribute(d6, g5), i7._.dirty = 1;
                        break;
                      case "src":
                        "image" == i7.type && l7.setAttributeNS(p5, "href", g5);
                        break;
                      case "stroke-width":
                        1 == i7._.sx && 1 == i7._.sy || (g5 /= s5(o5(i7._.sx), o5(i7._.sy)) || 1), l7.setAttribute(d6, g5), u6["stroke-dasharray"] && w4(i7, u6["stroke-dasharray"], a6), i7._.arrows && ("startString" in i7._.arrows && b4(i7, i7._.arrows.startString), "endString" in i7._.arrows && b4(i7, i7._.arrows.endString, 1));
                        break;
                      case "stroke-dasharray":
                        w4(i7, g5, a6);
                        break;
                      case "fill":
                        var N2 = r6(g5).match(t5._ISURL);
                        if (N2) {
                          T3 = x2("pattern");
                          var L2 = x2("image");
                          T3.id = t5.createUUID(), x2(T3, { x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1 }), x2(L2, { x: 0, y: 0, "xlink:href": N2[1] }), T3.appendChild(L2), function(e6) {
                            t5._preload(N2[1], function() {
                              var t6 = this.offsetWidth, r7 = this.offsetHeight;
                              x2(e6, { width: t6, height: r7 }), x2(L2, { width: t6, height: r7 });
                            });
                          }(T3), i7.paper.defs.appendChild(T3), x2(l7, { fill: "url(#" + T3.id + ")" }), i7.pattern = T3, i7.pattern && m3(i7);
                          break;
                        }
                        var P2 = t5.getRGB(g5);
                        if (P2.error) {
                          if (("circle" == i7.type || "ellipse" == i7.type || "r" != r6(g5).charAt()) && v5(i7, g5)) {
                            if ("opacity" in u6 || "fill-opacity" in u6) {
                              var z3 = t5._g.doc.getElementById(l7.getAttribute("fill").replace(/^url\(#|\)$/g, c6));
                              if (z3) {
                                var F3 = z3.getElementsByTagName("stop");
                                x2(F3[F3.length - 1], { "stop-opacity": ("opacity" in u6 ? u6.opacity : 1) * ("fill-opacity" in u6 ? u6["fill-opacity"] : 1) });
                              }
                            }
                            u6.gradient = g5, u6.fill = "none";
                            break;
                          }
                        } else
                          delete a6.gradient, delete u6.gradient, !t5.is(u6.opacity, "undefined") && t5.is(a6.opacity, "undefined") && x2(l7, { opacity: u6.opacity }), !t5.is(u6["fill-opacity"], "undefined") && t5.is(a6["fill-opacity"], "undefined") && x2(l7, { "fill-opacity": u6["fill-opacity"] });
                        P2[e5]("opacity") && x2(l7, { "fill-opacity": P2.opacity > 1 ? P2.opacity / 100 : P2.opacity });
                      case "stroke":
                        P2 = t5.getRGB(g5), l7.setAttribute(d6, P2.hex), "stroke" == d6 && P2[e5]("opacity") && x2(l7, { "stroke-opacity": P2.opacity > 1 ? P2.opacity / 100 : P2.opacity }), "stroke" == d6 && i7._.arrows && ("startString" in i7._.arrows && b4(i7, i7._.arrows.startString), "endString" in i7._.arrows && b4(i7, i7._.arrows.endString, 1));
                        break;
                      case "gradient":
                        ("circle" == i7.type || "ellipse" == i7.type || "r" != r6(g5).charAt()) && v5(i7, g5);
                        break;
                      case "opacity":
                        u6.gradient && !u6[e5]("stroke-opacity") && x2(l7, { "stroke-opacity": g5 > 1 ? g5 / 100 : g5 });
                      case "fill-opacity":
                        if (u6.gradient) {
                          (z3 = t5._g.doc.getElementById(l7.getAttribute("fill").replace(/^url\(#|\)$/g, c6))) && (F3 = z3.getElementsByTagName("stop"), x2(F3[F3.length - 1], { "stop-opacity": g5 }));
                          break;
                        }
                      default:
                        "font-size" == d6 && (g5 = n4(g5, 10) + "px");
                        var R = d6.replace(/(\-.)/g, function(t6) {
                          return t6.substring(1).toUpperCase();
                        });
                        l7.style[R] = g5, i7._.dirty = 1, l7.setAttribute(d6, g5);
                    }
                  }
                B2(i7, a6), l7.style.visibility = f5;
              }, B2 = function(i7, a6) {
                if ("text" == i7.type && (a6[e5]("text") || a6[e5]("font") || a6[e5]("font-size") || a6[e5]("x") || a6[e5]("y"))) {
                  var s6 = i7.attrs, o6 = i7.node, l7 = o6.firstChild ? n4(t5._g.doc.defaultView.getComputedStyle(o6.firstChild, c6).getPropertyValue("font-size"), 10) : 10;
                  if (a6[e5]("text")) {
                    for (s6.text = a6.text; o6.firstChild; )
                      o6.removeChild(o6.firstChild);
                    for (var h4, u6 = r6(a6.text).split("\n"), f5 = [], p6 = 0, d6 = u6.length; p6 < d6; p6++)
                      h4 = x2("tspan"), p6 && x2(h4, { dy: 1.2 * l7, x: s6.x }), h4.appendChild(t5._g.doc.createTextNode(u6[p6])), o6.appendChild(h4), f5[p6] = h4;
                  } else
                    for (p6 = 0, d6 = (f5 = o6.getElementsByTagName("tspan")).length; p6 < d6; p6++)
                      p6 ? x2(f5[p6], { dy: 1.2 * l7, x: s6.x }) : x2(f5[0], { dy: 0 });
                  x2(o6, { x: s6.x, y: s6.y }), i7._.dirty = 1;
                  var g5 = i7._getBBox(), v6 = s6.y - (g5.y + g5.height / 2);
                  v6 && t5.is(v6, "finite") && x2(f5[0], { dy: v6 });
                }
              }, C2 = function(t6) {
                return t6.parentNode && "a" === t6.parentNode.tagName.toLowerCase() ? t6.parentNode : t6;
              }, S = function(e6, r7) {
                this[0] = this.node = e6, e6.raphael = true, this.id = ("0000" + (Math.random() * Math.pow(36, 5) << 0).toString(36)).slice(-5), e6.raphaelid = this.id, this.matrix = t5.matrix(), this.realPath = null, this.paper = r7, this.attrs = this.attrs || {}, this._ = { transform: [], sx: 1, sy: 1, deg: 0, dx: 0, dy: 0, dirty: 1 }, !r7.bottom && (r7.bottom = this), this.prev = r7.top, r7.top && (r7.top.next = this), r7.top = this, this.next = null;
              }, T2 = t5.el;
              S.prototype = T2, T2.constructor = S, t5._engine.path = function(t6, e6) {
                var r7 = x2("path");
                e6.canvas && e6.canvas.appendChild(r7);
                var i7 = new S(r7, e6);
                return i7.type = "path", k3(i7, { fill: "none", stroke: "#000", path: t6 }), i7;
              }, T2.rotate = function(t6, e6, n5) {
                if (this.removed)
                  return this;
                if ((t6 = r6(t6).split(h3)).length - 1 && (e6 = i6(t6[1]), n5 = i6(t6[2])), t6 = i6(t6[0]), null == n5 && (e6 = n5), null == e6 || null == n5) {
                  var a6 = this.getBBox(1);
                  e6 = a6.x + a6.width / 2, n5 = a6.y + a6.height / 2;
                }
                return this.transform(this._.transform.concat([["r", t6, e6, n5]])), this;
              }, T2.scale = function(t6, e6, n5, a6) {
                if (this.removed)
                  return this;
                if ((t6 = r6(t6).split(h3)).length - 1 && (e6 = i6(t6[1]), n5 = i6(t6[2]), a6 = i6(t6[3])), t6 = i6(t6[0]), null == e6 && (e6 = t6), null == a6 && (n5 = a6), null == n5 || null == a6)
                  var s6 = this.getBBox(1);
                return n5 = null == n5 ? s6.x + s6.width / 2 : n5, a6 = null == a6 ? s6.y + s6.height / 2 : a6, this.transform(this._.transform.concat([["s", t6, e6, n5, a6]])), this;
              }, T2.translate = function(t6, e6) {
                return this.removed ? this : ((t6 = r6(t6).split(h3)).length - 1 && (e6 = i6(t6[1])), t6 = i6(t6[0]) || 0, e6 = +e6 || 0, this.transform(this._.transform.concat([["t", t6, e6]])), this);
              }, T2.transform = function(r7) {
                var i7 = this._;
                if (null == r7)
                  return i7.transform;
                if (t5._extractTransform(this, r7), this.clip && x2(this.clip, { transform: this.matrix.invert() }), this.pattern && m3(this), this.node && x2(this.node, { transform: this.matrix }), 1 != i7.sx || 1 != i7.sy) {
                  var n5 = this.attrs[e5]("stroke-width") ? this.attrs["stroke-width"] : 1;
                  this.attr({ "stroke-width": n5 });
                }
                return this;
              }, T2.hide = function() {
                return this.removed || (this.node.style.display = "none"), this;
              }, T2.show = function() {
                return this.removed || (this.node.style.display = ""), this;
              }, T2.remove = function() {
                var e6 = C2(this.node);
                if (!this.removed && e6.parentNode) {
                  var r7 = this.paper;
                  for (var i7 in r7.__set__ && r7.__set__.exclude(this), u5.unbind("raphael.*.*." + this.id), this.gradient && r7.defs.removeChild(this.gradient), t5._tear(this, r7), e6.parentNode.removeChild(e6), this.removeData(), this)
                    this[i7] = "function" == typeof this[i7] ? t5._removedFactory(i7) : null;
                  this.removed = true;
                }
              }, T2._getBBox = function() {
                if ("none" == this.node.style.display) {
                  this.show();
                  var t6 = true;
                }
                var e6, r7 = false;
                this.paper.canvas.parentElement ? e6 = this.paper.canvas.parentElement.style : this.paper.canvas.parentNode && (e6 = this.paper.canvas.parentNode.style), e6 && "none" == e6.display && (r7 = true, e6.display = "");
                var i7 = {};
                try {
                  i7 = this.node.getBBox();
                } catch (t7) {
                  i7 = { x: this.node.clientLeft, y: this.node.clientTop, width: this.node.clientWidth, height: this.node.clientHeight };
                } finally {
                  i7 = i7 || {}, r7 && (e6.display = "none");
                }
                return t6 && this.hide(), i7;
              }, T2.attr = function(r7, i7) {
                if (this.removed)
                  return this;
                if (null == r7) {
                  var n5 = {};
                  for (var a6 in this.attrs)
                    this.attrs[e5](a6) && (n5[a6] = this.attrs[a6]);
                  return n5.gradient && "none" == n5.fill && (n5.fill = n5.gradient) && delete n5.gradient, n5.transform = this._.transform, n5;
                }
                if (null == i7 && t5.is(r7, "string")) {
                  if ("fill" == r7 && "none" == this.attrs.fill && this.attrs.gradient)
                    return this.attrs.gradient;
                  if ("transform" == r7)
                    return this._.transform;
                  for (var s6 = r7.split(h3), o6 = {}, l7 = 0, c7 = s6.length; l7 < c7; l7++)
                    (r7 = s6[l7]) in this.attrs ? o6[r7] = this.attrs[r7] : t5.is(this.paper.customAttributes[r7], "function") ? o6[r7] = this.paper.customAttributes[r7].def : o6[r7] = t5._availableAttrs[r7];
                  return c7 - 1 ? o6 : o6[s6[0]];
                }
                if (null == i7 && t5.is(r7, "array")) {
                  for (o6 = {}, l7 = 0, c7 = r7.length; l7 < c7; l7++)
                    o6[r7[l7]] = this.attr(r7[l7]);
                  return o6;
                }
                if (null != i7) {
                  var f5 = {};
                  f5[r7] = i7;
                } else
                  null != r7 && t5.is(r7, "object") && (f5 = r7);
                for (var p6 in f5)
                  u5("raphael.attr." + p6 + "." + this.id, this, f5[p6]);
                for (p6 in this.paper.customAttributes)
                  if (this.paper.customAttributes[e5](p6) && f5[e5](p6) && t5.is(this.paper.customAttributes[p6], "function")) {
                    var d6 = this.paper.customAttributes[p6].apply(this, [].concat(f5[p6]));
                    for (var g5 in this.attrs[p6] = f5[p6], d6)
                      d6[e5](g5) && (f5[g5] = d6[g5]);
                  }
                return k3(this, f5), this;
              }, T2.toFront = function() {
                if (this.removed)
                  return this;
                var e6 = C2(this.node);
                e6.parentNode.appendChild(e6);
                var r7 = this.paper;
                return r7.top != this && t5._tofront(this, r7), this;
              }, T2.toBack = function() {
                if (this.removed)
                  return this;
                var e6 = C2(this.node), r7 = e6.parentNode;
                r7.insertBefore(e6, r7.firstChild), t5._toback(this, this.paper);
                this.paper;
                return this;
              }, T2.insertAfter = function(e6) {
                if (this.removed || !e6)
                  return this;
                var r7 = C2(this.node), i7 = C2(e6.node || e6[e6.length - 1].node);
                return i7.nextSibling ? i7.parentNode.insertBefore(r7, i7.nextSibling) : i7.parentNode.appendChild(r7), t5._insertafter(this, e6, this.paper), this;
              }, T2.insertBefore = function(e6) {
                if (this.removed || !e6)
                  return this;
                var r7 = C2(this.node), i7 = C2(e6.node || e6[0].node);
                return i7.parentNode.insertBefore(r7, i7), t5._insertbefore(this, e6, this.paper), this;
              }, T2.blur = function(e6) {
                var r7 = this;
                if (0 != +e6) {
                  var i7 = x2("filter"), n5 = x2("feGaussianBlur");
                  r7.attrs.blur = e6, i7.id = t5.createUUID(), x2(n5, { stdDeviation: +e6 || 1.5 }), i7.appendChild(n5), r7.paper.defs.appendChild(i7), r7._blur = i7, x2(r7.node, { filter: "url(#" + i7.id + ")" });
                } else
                  r7._blur && (r7._blur.parentNode.removeChild(r7._blur), delete r7._blur, delete r7.attrs.blur), r7.node.removeAttribute("filter");
                return r7;
              }, t5._engine.circle = function(t6, e6, r7, i7) {
                var n5 = x2("circle");
                t6.canvas && t6.canvas.appendChild(n5);
                var a6 = new S(n5, t6);
                return a6.attrs = { cx: e6, cy: r7, r: i7, fill: "none", stroke: "#000" }, a6.type = "circle", x2(n5, a6.attrs), a6;
              }, t5._engine.rect = function(t6, e6, r7, i7, n5, a6) {
                var s6 = x2("rect");
                t6.canvas && t6.canvas.appendChild(s6);
                var o6 = new S(s6, t6);
                return o6.attrs = { x: e6, y: r7, width: i7, height: n5, rx: a6 || 0, ry: a6 || 0, fill: "none", stroke: "#000" }, o6.type = "rect", x2(s6, o6.attrs), o6;
              }, t5._engine.ellipse = function(t6, e6, r7, i7, n5) {
                var a6 = x2("ellipse");
                t6.canvas && t6.canvas.appendChild(a6);
                var s6 = new S(a6, t6);
                return s6.attrs = { cx: e6, cy: r7, rx: i7, ry: n5, fill: "none", stroke: "#000" }, s6.type = "ellipse", x2(a6, s6.attrs), s6;
              }, t5._engine.image = function(t6, e6, r7, i7, n5, a6) {
                var s6 = x2("image");
                x2(s6, { x: r7, y: i7, width: n5, height: a6, preserveAspectRatio: "none" }), s6.setAttributeNS(p5, "href", e6), t6.canvas && t6.canvas.appendChild(s6);
                var o6 = new S(s6, t6);
                return o6.attrs = { x: r7, y: i7, width: n5, height: a6, src: e6 }, o6.type = "image", o6;
              }, t5._engine.text = function(e6, r7, i7, n5) {
                var a6 = x2("text");
                e6.canvas && e6.canvas.appendChild(a6);
                var s6 = new S(a6, e6);
                return s6.attrs = { x: r7, y: i7, "text-anchor": "middle", text: n5, "font-family": t5._availableAttrs["font-family"], "font-size": t5._availableAttrs["font-size"], stroke: "none", fill: "#000" }, s6.type = "text", k3(s6, s6.attrs), s6;
              }, t5._engine.setSize = function(t6, e6) {
                return this.width = t6 || this.width, this.height = e6 || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), this;
              }, t5._engine.create = function() {
                var e6 = t5._getContainer.apply(0, arguments), r7 = e6 && e6.container;
                if (!r7)
                  throw new Error("SVG container not found.");
                var i7, n5 = e6.x, a6 = e6.y, s6 = e6.width, o6 = e6.height, l7 = x2("svg"), h4 = "overflow:hidden;";
                return n5 = n5 || 0, a6 = a6 || 0, x2(l7, { height: o6 = o6 || 342, version: 1.1, width: s6 = s6 || 512, xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }), 1 == r7 ? (l7.style.cssText = h4 + "position:absolute;left:" + n5 + "px;top:" + a6 + "px", t5._g.doc.body.appendChild(l7), i7 = 1) : (l7.style.cssText = h4 + "position:relative", r7.firstChild ? r7.insertBefore(l7, r7.firstChild) : r7.appendChild(l7)), (r7 = new t5._Paper()).width = s6, r7.height = o6, r7.canvas = l7, r7.clear(), r7._left = r7._top = 0, i7 && (r7.renderfix = function() {
                }), r7.renderfix(), r7;
              }, t5._engine.setViewBox = function(t6, e6, r7, i7, n5) {
                u5("raphael.setViewBox", this, this._viewBox, [t6, e6, r7, i7, n5]);
                var a6, o6, l7 = this.getSize(), h4 = s5(r7 / l7.width, i7 / l7.height), c7 = this.top, p6 = n5 ? "xMidYMid meet" : "xMinYMin";
                for (null == t6 ? (this._vbSize && (h4 = 1), delete this._vbSize, a6 = "0 0 " + this.width + f4 + this.height) : (this._vbSize = h4, a6 = t6 + f4 + e6 + f4 + r7 + f4 + i7), x2(this.canvas, { viewBox: a6, preserveAspectRatio: p6 }); h4 && c7; )
                  o6 = "stroke-width" in c7.attrs ? c7.attrs["stroke-width"] : 1, c7.attr({ "stroke-width": o6 }), c7._.dirty = 1, c7._.dirtyT = 1, c7 = c7.prev;
                return this._viewBox = [t6, e6, r7, i7, !!n5], this;
              }, t5.prototype.renderfix = function() {
                var t6, e6 = this.canvas, r7 = e6.style;
                try {
                  t6 = e6.getScreenCTM() || e6.createSVGMatrix();
                } catch (r8) {
                  t6 = e6.createSVGMatrix();
                }
                var i7 = -t6.e % 1, n5 = -t6.f % 1;
                (i7 || n5) && (i7 && (this._left = (this._left + i7) % 1, r7.left = this._left + "px"), n5 && (this._top = (this._top + n5) % 1, r7.top = this._top + "px"));
              }, t5.prototype.clear = function() {
                t5.eve("raphael.clear", this);
                for (var e6 = this.canvas; e6.firstChild; )
                  e6.removeChild(e6.firstChild);
                this.bottom = this.top = null, (this.desc = x2("desc")).appendChild(t5._g.doc.createTextNode("Created with Rapha\xEBl " + t5.version)), e6.appendChild(this.desc), e6.appendChild(this.defs = x2("defs"));
              }, t5.prototype.remove = function() {
                for (var e6 in u5("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this)
                  this[e6] = "function" == typeof this[e6] ? t5._removedFactory(e6) : null;
              };
              var A2 = t5.st;
              for (var M2 in T2)
                T2[e5](M2) && !A2[e5](M2) && (A2[M2] = function(t6) {
                  return function() {
                    var e6 = arguments;
                    return this.forEach(function(r7) {
                      r7[t6].apply(r7, e6);
                    });
                  };
                }(M2));
            }
          }.apply(e4, i5)) || (t4.exports = n3);
        }, function(t4, e4, r5) {
          var i5, n3;
          i5 = [r5(0)], void 0 === (n3 = function(t5) {
            if (!t5 || t5.vml) {
              var e5 = "hasOwnProperty", r6 = String, i6 = parseFloat, n4 = Math, a5 = n4.round, s5 = n4.max, o5 = n4.min, l6 = n4.abs, h3 = /[, ]+/, u5 = t5.eve, c6 = " ", f4 = "", p5 = { M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x" }, d5 = /([clmz]),?([^clmz]*)/gi, g4 = / progid:\S+Blur\([^\)]+\)/g, x2 = /-?[^,\s-]+/g, v5 = "position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)", y3 = 21600, m3 = { path: 1, rect: 1, image: 1 }, b4 = { circle: 1, ellipse: 1 }, _4 = function(e6, r7, i7) {
                var n5 = t5.matrix();
                return n5.rotate(-e6, 0.5, 0.5), { dx: n5.x(r7, i7), dy: n5.y(r7, i7) };
              }, w4 = function(t6, e6, r7, i7, n5, a6) {
                var s6 = t6._, o6 = t6.matrix, h4 = s6.fillpos, u6 = t6.node, f5 = u6.style, p6 = 1, d6 = "", g5 = y3 / e6, x3 = y3 / r7;
                if (f5.visibility = "hidden", e6 && r7) {
                  if (u6.coordsize = l6(g5) + c6 + l6(x3), f5.rotation = a6 * (e6 * r7 < 0 ? -1 : 1), a6) {
                    var v6 = _4(a6, i7, n5);
                    i7 = v6.dx, n5 = v6.dy;
                  }
                  if (e6 < 0 && (d6 += "x"), r7 < 0 && (d6 += " y") && (p6 = -1), f5.flip = d6, u6.coordorigin = i7 * -g5 + c6 + n5 * -x3, h4 || s6.fillsize) {
                    var m4 = u6.getElementsByTagName("fill");
                    m4 = m4 && m4[0], u6.removeChild(m4), h4 && (v6 = _4(a6, o6.x(h4[0], h4[1]), o6.y(h4[0], h4[1])), m4.position = v6.dx * p6 + c6 + v6.dy * p6), s6.fillsize && (m4.size = s6.fillsize[0] * l6(e6) + c6 + s6.fillsize[1] * l6(r7)), u6.appendChild(m4);
                  }
                  f5.visibility = "visible";
                }
              };
              t5.toString = function() {
                return "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xEBl " + this.version;
              };
              var k3, B2 = function(t6, e6, i7) {
                for (var n5 = r6(e6).toLowerCase().split("-"), a6 = i7 ? "end" : "start", s6 = n5.length, o6 = "classic", l7 = "medium", h4 = "medium"; s6--; )
                  switch (n5[s6]) {
                    case "block":
                    case "classic":
                    case "oval":
                    case "diamond":
                    case "open":
                    case "none":
                      o6 = n5[s6];
                      break;
                    case "wide":
                    case "narrow":
                      h4 = n5[s6];
                      break;
                    case "long":
                    case "short":
                      l7 = n5[s6];
                  }
                var u6 = t6.node.getElementsByTagName("stroke")[0];
                u6[a6 + "arrow"] = o6, u6[a6 + "arrowlength"] = l7, u6[a6 + "arrowwidth"] = h4;
              }, C2 = function(n5, l7) {
                n5.attrs = n5.attrs || {};
                var u6 = n5.node, g5 = n5.attrs, v6 = u6.style, _5 = m3[n5.type] && (l7.x != g5.x || l7.y != g5.y || l7.width != g5.width || l7.height != g5.height || l7.cx != g5.cx || l7.cy != g5.cy || l7.rx != g5.rx || l7.ry != g5.ry || l7.r != g5.r), C3 = b4[n5.type] && (g5.cx != l7.cx || g5.cy != l7.cy || g5.r != l7.r || g5.rx != l7.rx || g5.ry != l7.ry), T3 = n5;
                for (var A3 in l7)
                  l7[e5](A3) && (g5[A3] = l7[A3]);
                if (_5 && (g5.path = t5._getPath[n5.type](n5), n5._.dirty = 1), l7.href && (u6.href = l7.href), l7.title && (u6.title = l7.title), l7.target && (u6.target = l7.target), l7.cursor && (v6.cursor = l7.cursor), "blur" in l7 && n5.blur(l7.blur), (l7.path && "path" == n5.type || _5) && (u6.path = function(e6) {
                  var i7 = /[ahqstv]/gi, n6 = t5._pathToAbsolute;
                  if (r6(e6).match(i7) && (n6 = t5._path2curve), i7 = /[clmz]/g, n6 == t5._pathToAbsolute && !r6(e6).match(i7)) {
                    var s6 = r6(e6).replace(d5, function(t6, e7, r7) {
                      var i8 = [], n7 = "m" == e7.toLowerCase(), s7 = p5[e7];
                      return r7.replace(x2, function(t7) {
                        n7 && 2 == i8.length && (s7 += i8 + p5["m" == e7 ? "l" : "L"], i8 = []), i8.push(a5(t7 * y3));
                      }), s7 + i8;
                    });
                    return s6;
                  }
                  var o6, l8, h4 = n6(e6);
                  s6 = [];
                  for (var u7 = 0, g6 = h4.length; u7 < g6; u7++) {
                    o6 = h4[u7], "z" == (l8 = h4[u7][0].toLowerCase()) && (l8 = "x");
                    for (var v7 = 1, m4 = o6.length; v7 < m4; v7++)
                      l8 += a5(o6[v7] * y3) + (v7 != m4 - 1 ? "," : f4);
                    s6.push(l8);
                  }
                  return s6.join(c6);
                }(~r6(g5.path).toLowerCase().indexOf("r") ? t5._pathToAbsolute(g5.path) : g5.path), n5._.dirty = 1, "image" == n5.type && (n5._.fillpos = [g5.x, g5.y], n5._.fillsize = [g5.width, g5.height], w4(n5, 1, 1, 0, 0, 0))), "transform" in l7 && n5.transform(l7.transform), C3) {
                  var M3 = +g5.cx, E3 = +g5.cy, N2 = +g5.rx || +g5.r || 0, L2 = +g5.ry || +g5.r || 0;
                  u6.path = t5.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", a5((M3 - N2) * y3), a5((E3 - L2) * y3), a5((M3 + N2) * y3), a5((E3 + L2) * y3), a5(M3 * y3)), n5._.dirty = 1;
                }
                if ("clip-rect" in l7) {
                  var P2 = r6(l7["clip-rect"]).split(h3);
                  if (4 == P2.length) {
                    P2[2] = +P2[2] + +P2[0], P2[3] = +P2[3] + +P2[1];
                    var z3 = u6.clipRect || t5._g.doc.createElement("div"), F3 = z3.style;
                    F3.clip = t5.format("rect({1}px {2}px {3}px {0}px)", P2), u6.clipRect || (F3.position = "absolute", F3.top = 0, F3.left = 0, F3.width = n5.paper.width + "px", F3.height = n5.paper.height + "px", u6.parentNode.insertBefore(z3, u6), z3.appendChild(u6), u6.clipRect = z3);
                  }
                  l7["clip-rect"] || u6.clipRect && (u6.clipRect.style.clip = "auto");
                }
                if (n5.textpath) {
                  var R = n5.textpath.style;
                  l7.font && (R.font = l7.font), l7["font-family"] && (R.fontFamily = '"' + l7["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, f4) + '"'), l7["font-size"] && (R.fontSize = l7["font-size"]), l7["font-weight"] && (R.fontWeight = l7["font-weight"]), l7["font-style"] && (R.fontStyle = l7["font-style"]);
                }
                if ("arrow-start" in l7 && B2(T3, l7["arrow-start"]), "arrow-end" in l7 && B2(T3, l7["arrow-end"], 1), null != l7.opacity || null != l7.fill || null != l7.src || null != l7.stroke || null != l7["stroke-width"] || null != l7["stroke-opacity"] || null != l7["fill-opacity"] || null != l7["stroke-dasharray"] || null != l7["stroke-miterlimit"] || null != l7["stroke-linejoin"] || null != l7["stroke-linecap"]) {
                  var j3 = u6.getElementsByTagName("fill");
                  if (!(j3 = j3 && j3[0]) && (j3 = k3("fill")), "image" == n5.type && l7.src && (j3.src = l7.src), l7.fill && (j3.on = true), null != j3.on && "none" != l7.fill && null !== l7.fill || (j3.on = false), j3.on && l7.fill) {
                    var I2 = r6(l7.fill).match(t5._ISURL);
                    if (I2) {
                      j3.parentNode == u6 && u6.removeChild(j3), j3.rotate = true, j3.src = I2[1], j3.type = "tile";
                      var D2 = n5.getBBox(1);
                      j3.position = D2.x + c6 + D2.y, n5._.fillpos = [D2.x, D2.y], t5._preload(I2[1], function() {
                        n5._.fillsize = [this.offsetWidth, this.offsetHeight];
                      });
                    } else
                      j3.color = t5.getRGB(l7.fill).hex, j3.src = f4, j3.type = "solid", t5.getRGB(l7.fill).error && (T3.type in { circle: 1, ellipse: 1 } || "r" != r6(l7.fill).charAt()) && S(T3, l7.fill, j3) && (g5.fill = "none", g5.gradient = l7.fill, j3.rotate = false);
                  }
                  if ("fill-opacity" in l7 || "opacity" in l7) {
                    var q2 = ((+g5["fill-opacity"] + 1 || 2) - 1) * ((+g5.opacity + 1 || 2) - 1) * ((+t5.getRGB(l7.fill).o + 1 || 2) - 1);
                    q2 = o5(s5(q2, 0), 1), j3.opacity = q2, j3.src && (j3.color = "none");
                  }
                  u6.appendChild(j3);
                  var O2 = u6.getElementsByTagName("stroke") && u6.getElementsByTagName("stroke")[0], V = false;
                  !O2 && (V = O2 = k3("stroke")), (l7.stroke && "none" != l7.stroke || l7["stroke-width"] || null != l7["stroke-opacity"] || l7["stroke-dasharray"] || l7["stroke-miterlimit"] || l7["stroke-linejoin"] || l7["stroke-linecap"]) && (O2.on = true), ("none" == l7.stroke || null === l7.stroke || null == O2.on || 0 == l7.stroke || 0 == l7["stroke-width"]) && (O2.on = false);
                  var W = t5.getRGB(l7.stroke);
                  O2.on && l7.stroke && (O2.color = W.hex), q2 = ((+g5["stroke-opacity"] + 1 || 2) - 1) * ((+g5.opacity + 1 || 2) - 1) * ((+W.o + 1 || 2) - 1);
                  var Y = 0.75 * (i6(l7["stroke-width"]) || 1);
                  if (q2 = o5(s5(q2, 0), 1), null == l7["stroke-width"] && (Y = g5["stroke-width"]), l7["stroke-width"] && (O2.weight = Y), Y && Y < 1 && (q2 *= Y) && (O2.weight = 1), O2.opacity = q2, l7["stroke-linejoin"] && (O2.joinstyle = l7["stroke-linejoin"] || "miter"), O2.miterlimit = l7["stroke-miterlimit"] || 8, l7["stroke-linecap"] && (O2.endcap = "butt" == l7["stroke-linecap"] ? "flat" : "square" == l7["stroke-linecap"] ? "square" : "round"), "stroke-dasharray" in l7) {
                    var G = { "-": "shortdash", ".": "shortdot", "-.": "shortdashdot", "-..": "shortdashdotdot", ". ": "dot", "- ": "dash", "--": "longdash", "- .": "dashdot", "--.": "longdashdot", "--..": "longdashdotdot" };
                    O2.dashstyle = G[e5](l7["stroke-dasharray"]) ? G[l7["stroke-dasharray"]] : f4;
                  }
                  V && u6.appendChild(O2);
                }
                if ("text" == T3.type) {
                  T3.paper.canvas.style.display = f4;
                  var H2 = T3.paper.span, X = g5.font && g5.font.match(/\d+(?:\.\d*)?(?=px)/);
                  v6 = H2.style, g5.font && (v6.font = g5.font), g5["font-family"] && (v6.fontFamily = g5["font-family"]), g5["font-weight"] && (v6.fontWeight = g5["font-weight"]), g5["font-style"] && (v6.fontStyle = g5["font-style"]), X = i6(g5["font-size"] || X && X[0]) || 10, v6.fontSize = 100 * X + "px", T3.textpath.string && (H2.innerHTML = r6(T3.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                  var U = H2.getBoundingClientRect();
                  T3.W = g5.w = (U.right - U.left) / 100, T3.H = g5.h = (U.bottom - U.top) / 100, T3.X = g5.x, T3.Y = g5.y + T3.H / 2, ("x" in l7 || "y" in l7) && (T3.path.v = t5.format("m{0},{1}l{2},{1}", a5(g5.x * y3), a5(g5.y * y3), a5(g5.x * y3) + 1));
                  for (var $2 = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"], Z = 0, Q = $2.length; Z < Q; Z++)
                    if ($2[Z] in l7) {
                      T3._.dirty = 1;
                      break;
                    }
                  switch (g5["text-anchor"]) {
                    case "start":
                      T3.textpath.style["v-text-align"] = "left", T3.bbx = T3.W / 2;
                      break;
                    case "end":
                      T3.textpath.style["v-text-align"] = "right", T3.bbx = -T3.W / 2;
                      break;
                    default:
                      T3.textpath.style["v-text-align"] = "center", T3.bbx = 0;
                  }
                  T3.textpath.style["v-text-kern"] = true;
                }
              }, S = function(e6, a6, s6) {
                e6.attrs = e6.attrs || {};
                e6.attrs;
                var o6 = Math.pow, l7 = "linear", h4 = ".5 .5";
                if (e6.attrs.gradient = a6, a6 = (a6 = r6(a6).replace(t5._radial_gradient, function(t6, e7, r7) {
                  return l7 = "radial", e7 && r7 && (e7 = i6(e7), r7 = i6(r7), o6(e7 - 0.5, 2) + o6(r7 - 0.5, 2) > 0.25 && (r7 = n4.sqrt(0.25 - o6(e7 - 0.5, 2)) * (2 * (r7 > 0.5) - 1) + 0.5), h4 = e7 + c6 + r7), f4;
                })).split(/\s*\-\s*/), "linear" == l7) {
                  var u6 = a6.shift();
                  if (u6 = -i6(u6), isNaN(u6))
                    return null;
                }
                var p6 = t5._parseDots(a6);
                if (!p6)
                  return null;
                if (e6 = e6.shape || e6.node, p6.length) {
                  e6.removeChild(s6), s6.on = true, s6.method = "none", s6.color = p6[0].color, s6.color2 = p6[p6.length - 1].color;
                  for (var d6 = [], g5 = 0, x3 = p6.length; g5 < x3; g5++)
                    p6[g5].offset && d6.push(p6[g5].offset + c6 + p6[g5].color);
                  s6.colors = d6.length ? d6.join() : "0% " + s6.color, "radial" == l7 ? (s6.type = "gradientTitle", s6.focus = "100%", s6.focussize = "0 0", s6.focusposition = h4, s6.angle = 0) : (s6.type = "gradient", s6.angle = (270 - u6) % 360), e6.appendChild(s6);
                }
                return 1;
              }, T2 = function(e6, r7) {
                this[0] = this.node = e6, e6.raphael = true, this.id = t5._oid++, e6.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = r7, this.matrix = t5.matrix(), this._ = { transform: [], sx: 1, sy: 1, dx: 0, dy: 0, deg: 0, dirty: 1, dirtyT: 1 }, !r7.bottom && (r7.bottom = this), this.prev = r7.top, r7.top && (r7.top.next = this), r7.top = this, this.next = null;
              }, A2 = t5.el;
              T2.prototype = A2, A2.constructor = T2, A2.transform = function(e6) {
                if (null == e6)
                  return this._.transform;
                var i7, n5 = this.paper._viewBoxShift, a6 = n5 ? "s" + [n5.scale, n5.scale] + "-1-1t" + [n5.dx, n5.dy] : f4;
                n5 && (i7 = e6 = r6(e6).replace(/\.{3}|\u2026/g, this._.transform || f4)), t5._extractTransform(this, a6 + e6);
                var s6, o6 = this.matrix.clone(), l7 = this.skew, h4 = this.node, u6 = ~r6(this.attrs.fill).indexOf("-"), p6 = !r6(this.attrs.fill).indexOf("url(");
                if (o6.translate(1, 1), p6 || u6 || "image" == this.type)
                  if (l7.matrix = "1 0 0 1", l7.offset = "0 0", s6 = o6.split(), u6 && s6.noRotation || !s6.isSimple) {
                    h4.style.filter = o6.toFilter();
                    var d6 = this.getBBox(), g5 = this.getBBox(1), x3 = d6.x - g5.x, v6 = d6.y - g5.y;
                    h4.coordorigin = x3 * -y3 + c6 + v6 * -y3, w4(this, 1, 1, x3, v6, 0);
                  } else
                    h4.style.filter = f4, w4(this, s6.scalex, s6.scaley, s6.dx, s6.dy, s6.rotate);
                else
                  h4.style.filter = f4, l7.matrix = r6(o6), l7.offset = o6.offset();
                return null !== i7 && (this._.transform = i7, t5._extractTransform(this, i7)), this;
              }, A2.rotate = function(t6, e6, n5) {
                if (this.removed)
                  return this;
                if (null != t6) {
                  if ((t6 = r6(t6).split(h3)).length - 1 && (e6 = i6(t6[1]), n5 = i6(t6[2])), t6 = i6(t6[0]), null == n5 && (e6 = n5), null == e6 || null == n5) {
                    var a6 = this.getBBox(1);
                    e6 = a6.x + a6.width / 2, n5 = a6.y + a6.height / 2;
                  }
                  return this._.dirtyT = 1, this.transform(this._.transform.concat([["r", t6, e6, n5]])), this;
                }
              }, A2.translate = function(t6, e6) {
                return this.removed ? this : ((t6 = r6(t6).split(h3)).length - 1 && (e6 = i6(t6[1])), t6 = i6(t6[0]) || 0, e6 = +e6 || 0, this._.bbox && (this._.bbox.x += t6, this._.bbox.y += e6), this.transform(this._.transform.concat([["t", t6, e6]])), this);
              }, A2.scale = function(t6, e6, n5, a6) {
                if (this.removed)
                  return this;
                if ((t6 = r6(t6).split(h3)).length - 1 && (e6 = i6(t6[1]), n5 = i6(t6[2]), a6 = i6(t6[3]), isNaN(n5) && (n5 = null), isNaN(a6) && (a6 = null)), t6 = i6(t6[0]), null == e6 && (e6 = t6), null == a6 && (n5 = a6), null == n5 || null == a6)
                  var s6 = this.getBBox(1);
                return n5 = null == n5 ? s6.x + s6.width / 2 : n5, a6 = null == a6 ? s6.y + s6.height / 2 : a6, this.transform(this._.transform.concat([["s", t6, e6, n5, a6]])), this._.dirtyT = 1, this;
              }, A2.hide = function() {
                return !this.removed && (this.node.style.display = "none"), this;
              }, A2.show = function() {
                return !this.removed && (this.node.style.display = f4), this;
              }, A2.auxGetBBox = t5.el.getBBox, A2.getBBox = function() {
                var t6 = this.auxGetBBox();
                if (this.paper && this.paper._viewBoxShift) {
                  var e6 = {}, r7 = 1 / this.paper._viewBoxShift.scale;
                  return e6.x = t6.x - this.paper._viewBoxShift.dx, e6.x *= r7, e6.y = t6.y - this.paper._viewBoxShift.dy, e6.y *= r7, e6.width = t6.width * r7, e6.height = t6.height * r7, e6.x2 = e6.x + e6.width, e6.y2 = e6.y + e6.height, e6;
                }
                return t6;
              }, A2._getBBox = function() {
                return this.removed ? {} : { x: this.X + (this.bbx || 0) - this.W / 2, y: this.Y - this.H, width: this.W, height: this.H };
              }, A2.remove = function() {
                if (!this.removed && this.node.parentNode) {
                  for (var e6 in this.paper.__set__ && this.paper.__set__.exclude(this), t5.eve.unbind("raphael.*.*." + this.id), t5._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape), this)
                    this[e6] = "function" == typeof this[e6] ? t5._removedFactory(e6) : null;
                  this.removed = true;
                }
              }, A2.attr = function(r7, i7) {
                if (this.removed)
                  return this;
                if (null == r7) {
                  var n5 = {};
                  for (var a6 in this.attrs)
                    this.attrs[e5](a6) && (n5[a6] = this.attrs[a6]);
                  return n5.gradient && "none" == n5.fill && (n5.fill = n5.gradient) && delete n5.gradient, n5.transform = this._.transform, n5;
                }
                if (null == i7 && t5.is(r7, "string")) {
                  if ("fill" == r7 && "none" == this.attrs.fill && this.attrs.gradient)
                    return this.attrs.gradient;
                  for (var s6 = r7.split(h3), o6 = {}, l7 = 0, c7 = s6.length; l7 < c7; l7++)
                    (r7 = s6[l7]) in this.attrs ? o6[r7] = this.attrs[r7] : t5.is(this.paper.customAttributes[r7], "function") ? o6[r7] = this.paper.customAttributes[r7].def : o6[r7] = t5._availableAttrs[r7];
                  return c7 - 1 ? o6 : o6[s6[0]];
                }
                if (this.attrs && null == i7 && t5.is(r7, "array")) {
                  for (o6 = {}, l7 = 0, c7 = r7.length; l7 < c7; l7++)
                    o6[r7[l7]] = this.attr(r7[l7]);
                  return o6;
                }
                var f5;
                for (var p6 in null != i7 && ((f5 = {})[r7] = i7), null == i7 && t5.is(r7, "object") && (f5 = r7), f5)
                  u5("raphael.attr." + p6 + "." + this.id, this, f5[p6]);
                if (f5) {
                  for (p6 in this.paper.customAttributes)
                    if (this.paper.customAttributes[e5](p6) && f5[e5](p6) && t5.is(this.paper.customAttributes[p6], "function")) {
                      var d6 = this.paper.customAttributes[p6].apply(this, [].concat(f5[p6]));
                      for (var g5 in this.attrs[p6] = f5[p6], d6)
                        d6[e5](g5) && (f5[g5] = d6[g5]);
                    }
                  f5.text && "text" == this.type && (this.textpath.string = f5.text), C2(this, f5);
                }
                return this;
              }, A2.toFront = function() {
                return !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && t5._tofront(this, this.paper), this;
              }, A2.toBack = function() {
                return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), t5._toback(this, this.paper)), this);
              }, A2.insertAfter = function(e6) {
                return this.removed ? this : (e6.constructor == t5.st.constructor && (e6 = e6[e6.length - 1]), e6.node.nextSibling ? e6.node.parentNode.insertBefore(this.node, e6.node.nextSibling) : e6.node.parentNode.appendChild(this.node), t5._insertafter(this, e6, this.paper), this);
              }, A2.insertBefore = function(e6) {
                return this.removed ? this : (e6.constructor == t5.st.constructor && (e6 = e6[0]), e6.node.parentNode.insertBefore(this.node, e6.node), t5._insertbefore(this, e6, this.paper), this);
              }, A2.blur = function(e6) {
                var r7 = this.node.runtimeStyle, i7 = r7.filter;
                return i7 = i7.replace(g4, f4), 0 != +e6 ? (this.attrs.blur = e6, r7.filter = i7 + c6 + " progid:DXImageTransform.Microsoft.Blur(pixelradius=" + (+e6 || 1.5) + ")", r7.margin = t5.format("-{0}px 0 0 -{0}px", a5(+e6 || 1.5))) : (r7.filter = i7, r7.margin = 0, delete this.attrs.blur), this;
              }, t5._engine.path = function(t6, e6) {
                var r7 = k3("shape");
                r7.style.cssText = v5, r7.coordsize = y3 + c6 + y3, r7.coordorigin = e6.coordorigin;
                var i7 = new T2(r7, e6), n5 = { fill: "none", stroke: "#000" };
                t6 && (n5.path = t6), i7.type = "path", i7.path = [], i7.Path = f4, C2(i7, n5), e6.canvas && e6.canvas.appendChild(r7);
                var a6 = k3("skew");
                return a6.on = true, r7.appendChild(a6), i7.skew = a6, i7.transform(f4), i7;
              }, t5._engine.rect = function(e6, r7, i7, n5, a6, s6) {
                var o6 = t5._rectPath(r7, i7, n5, a6, s6), l7 = e6.path(o6), h4 = l7.attrs;
                return l7.X = h4.x = r7, l7.Y = h4.y = i7, l7.W = h4.width = n5, l7.H = h4.height = a6, h4.r = s6, h4.path = o6, l7.type = "rect", l7;
              }, t5._engine.ellipse = function(t6, e6, r7, i7, n5) {
                var a6 = t6.path();
                a6.attrs;
                return a6.X = e6 - i7, a6.Y = r7 - n5, a6.W = 2 * i7, a6.H = 2 * n5, a6.type = "ellipse", C2(a6, { cx: e6, cy: r7, rx: i7, ry: n5 }), a6;
              }, t5._engine.circle = function(t6, e6, r7, i7) {
                var n5 = t6.path();
                n5.attrs;
                return n5.X = e6 - i7, n5.Y = r7 - i7, n5.W = n5.H = 2 * i7, n5.type = "circle", C2(n5, { cx: e6, cy: r7, r: i7 }), n5;
              }, t5._engine.image = function(e6, r7, i7, n5, a6, s6) {
                var o6 = t5._rectPath(i7, n5, a6, s6), l7 = e6.path(o6).attr({ stroke: "none" }), h4 = l7.attrs, u6 = l7.node, c7 = u6.getElementsByTagName("fill")[0];
                return h4.src = r7, l7.X = h4.x = i7, l7.Y = h4.y = n5, l7.W = h4.width = a6, l7.H = h4.height = s6, h4.path = o6, l7.type = "image", c7.parentNode == u6 && u6.removeChild(c7), c7.rotate = true, c7.src = r7, c7.type = "tile", l7._.fillpos = [i7, n5], l7._.fillsize = [a6, s6], u6.appendChild(c7), w4(l7, 1, 1, 0, 0, 0), l7;
              }, t5._engine.text = function(e6, i7, n5, s6) {
                var o6 = k3("shape"), l7 = k3("path"), h4 = k3("textpath");
                i7 = i7 || 0, n5 = n5 || 0, s6 = s6 || "", l7.v = t5.format("m{0},{1}l{2},{1}", a5(i7 * y3), a5(n5 * y3), a5(i7 * y3) + 1), l7.textpathok = true, h4.string = r6(s6), h4.on = true, o6.style.cssText = v5, o6.coordsize = y3 + c6 + y3, o6.coordorigin = "0 0";
                var u6 = new T2(o6, e6), p6 = { fill: "#000", stroke: "none", font: t5._availableAttrs.font, text: s6 };
                u6.shape = o6, u6.path = l7, u6.textpath = h4, u6.type = "text", u6.attrs.text = r6(s6), u6.attrs.x = i7, u6.attrs.y = n5, u6.attrs.w = 1, u6.attrs.h = 1, C2(u6, p6), o6.appendChild(h4), o6.appendChild(l7), e6.canvas.appendChild(o6);
                var d6 = k3("skew");
                return d6.on = true, o6.appendChild(d6), u6.skew = d6, u6.transform(f4), u6;
              }, t5._engine.setSize = function(e6, r7) {
                var i7 = this.canvas.style;
                return this.width = e6, this.height = r7, e6 == +e6 && (e6 += "px"), r7 == +r7 && (r7 += "px"), i7.width = e6, i7.height = r7, i7.clip = "rect(0 " + e6 + " " + r7 + " 0)", this._viewBox && t5._engine.setViewBox.apply(this, this._viewBox), this;
              }, t5._engine.setViewBox = function(e6, r7, i7, n5, a6) {
                t5.eve("raphael.setViewBox", this, this._viewBox, [e6, r7, i7, n5, a6]);
                var s6, o6, l7 = this.getSize(), h4 = l7.width, u6 = l7.height;
                return a6 && (i7 * (s6 = u6 / n5) < h4 && (e6 -= (h4 - i7 * s6) / 2 / s6), n5 * (o6 = h4 / i7) < u6 && (r7 -= (u6 - n5 * o6) / 2 / o6)), this._viewBox = [e6, r7, i7, n5, !!a6], this._viewBoxShift = { dx: -e6, dy: -r7, scale: l7 }, this.forEach(function(t6) {
                  t6.transform("...");
                }), this;
              }, t5._engine.initWin = function(t6) {
                var e6 = t6.document;
                e6.styleSheets.length < 31 ? e6.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)") : e6.styleSheets[0].addRule(".rvml", "behavior:url(#default#VML)");
                try {
                  !e6.namespaces.rvml && e6.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), k3 = function(t7) {
                    return e6.createElement("<rvml:" + t7 + ' class="rvml">');
                  };
                } catch (t7) {
                  k3 = function(t8) {
                    return e6.createElement("<" + t8 + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                  };
                }
              }, t5._engine.initWin(t5._g.win), t5._engine.create = function() {
                var e6 = t5._getContainer.apply(0, arguments), r7 = e6.container, i7 = e6.height, n5 = e6.width, a6 = e6.x, s6 = e6.y;
                if (!r7)
                  throw new Error("VML container not found.");
                var o6 = new t5._Paper(), l7 = o6.canvas = t5._g.doc.createElement("div"), h4 = l7.style;
                return a6 = a6 || 0, s6 = s6 || 0, n5 = n5 || 512, i7 = i7 || 342, o6.width = n5, o6.height = i7, n5 == +n5 && (n5 += "px"), i7 == +i7 && (i7 += "px"), o6.coordsize = 216e5 + c6 + 216e5, o6.coordorigin = "0 0", o6.span = t5._g.doc.createElement("span"), o6.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", l7.appendChild(o6.span), h4.cssText = t5.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", n5, i7), 1 == r7 ? (t5._g.doc.body.appendChild(l7), h4.left = a6 + "px", h4.top = s6 + "px", h4.position = "absolute") : r7.firstChild ? r7.insertBefore(l7, r7.firstChild) : r7.appendChild(l7), o6.renderfix = function() {
                }, o6;
              }, t5.prototype.clear = function() {
                t5.eve("raphael.clear", this), this.canvas.innerHTML = f4, this.span = t5._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null;
              }, t5.prototype.remove = function() {
                for (var e6 in t5.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas), this)
                  this[e6] = "function" == typeof this[e6] ? t5._removedFactory(e6) : null;
                return true;
              };
              var M2 = t5.st;
              for (var E2 in A2)
                A2[e5](E2) && !M2[e5](E2) && (M2[E2] = function(t6) {
                  return function() {
                    var e6 = arguments;
                    return this.forEach(function(r7) {
                      r7[t6].apply(r7, e6);
                    });
                  };
                }(E2));
            }
          }.apply(e4, i5)) || (t4.exports = n3);
        }]);
      });
    }
  });

  // node_modules/jazzicon/paper.js
  var require_paper = __commonJS({
    "node_modules/jazzicon/paper.js"(exports, module) {
      var Raphael = require_raphael_min();
      function newPaper(diameter) {
        var container = document.createElement("div");
        container.style.borderRadius = "50px";
        container.style.overflow = "hidden";
        container.style.padding = "0px";
        container.style.margin = "0px";
        container.style.width = "" + diameter + "px";
        container.style.height = "" + diameter + "px";
        container.style.display = "inline-block";
        var paper = Raphael(container, 100, 100);
        return {
          paper,
          container
        };
      }
      module.exports = newPaper;
    }
  });

  // node_modules/clone/clone.js
  var require_clone = __commonJS({
    "node_modules/clone/clone.js"(exports, module) {
      var clone = function() {
        "use strict";
        function clone2(parent, circular, depth, prototype) {
          var filter;
          if (typeof circular === "object") {
            depth = circular.depth;
            prototype = circular.prototype;
            filter = circular.filter;
            circular = circular.circular;
          }
          var allParents = [];
          var allChildren = [];
          var useBuffer = typeof Buffer != "undefined";
          if (typeof circular == "undefined")
            circular = true;
          if (typeof depth == "undefined")
            depth = Infinity;
          function _clone(parent2, depth2) {
            if (parent2 === null)
              return null;
            if (depth2 == 0)
              return parent2;
            var child;
            var proto;
            if (typeof parent2 != "object") {
              return parent2;
            }
            if (clone2.__isArray(parent2)) {
              child = [];
            } else if (clone2.__isRegExp(parent2)) {
              child = new RegExp(parent2.source, __getRegExpFlags(parent2));
              if (parent2.lastIndex)
                child.lastIndex = parent2.lastIndex;
            } else if (clone2.__isDate(parent2)) {
              child = new Date(parent2.getTime());
            } else if (useBuffer && Buffer.isBuffer(parent2)) {
              if (Buffer.allocUnsafe) {
                child = Buffer.allocUnsafe(parent2.length);
              } else {
                child = new Buffer(parent2.length);
              }
              parent2.copy(child);
              return child;
            } else {
              if (typeof prototype == "undefined") {
                proto = Object.getPrototypeOf(parent2);
                child = Object.create(proto);
              } else {
                child = Object.create(prototype);
                proto = prototype;
              }
            }
            if (circular) {
              var index = allParents.indexOf(parent2);
              if (index != -1) {
                return allChildren[index];
              }
              allParents.push(parent2);
              allChildren.push(child);
            }
            for (var i5 in parent2) {
              var attrs;
              if (proto) {
                attrs = Object.getOwnPropertyDescriptor(proto, i5);
              }
              if (attrs && attrs.set == null) {
                continue;
              }
              child[i5] = _clone(parent2[i5], depth2 - 1);
            }
            return child;
          }
          return _clone(parent, depth);
        }
        clone2.clonePrototype = function clonePrototype(parent) {
          if (parent === null)
            return null;
          var c6 = function() {
          };
          c6.prototype = parent;
          return new c6();
        };
        function __objToStr(o5) {
          return Object.prototype.toString.call(o5);
        }
        ;
        clone2.__objToStr = __objToStr;
        function __isDate(o5) {
          return typeof o5 === "object" && __objToStr(o5) === "[object Date]";
        }
        ;
        clone2.__isDate = __isDate;
        function __isArray(o5) {
          return typeof o5 === "object" && __objToStr(o5) === "[object Array]";
        }
        ;
        clone2.__isArray = __isArray;
        function __isRegExp(o5) {
          return typeof o5 === "object" && __objToStr(o5) === "[object RegExp]";
        }
        ;
        clone2.__isRegExp = __isRegExp;
        function __getRegExpFlags(re) {
          var flags = "";
          if (re.global)
            flags += "g";
          if (re.ignoreCase)
            flags += "i";
          if (re.multiline)
            flags += "m";
          return flags;
        }
        ;
        clone2.__getRegExpFlags = __getRegExpFlags;
        return clone2;
      }();
      if (typeof module === "object" && module.exports) {
        module.exports = clone;
      }
    }
  });

  // node_modules/color-name/index.js
  var require_color_name = __commonJS({
    "node_modules/color-name/index.js"(exports, module) {
      "use strict";
      module.exports = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
      };
    }
  });

  // node_modules/color-convert/conversions.js
  var require_conversions = __commonJS({
    "node_modules/color-convert/conversions.js"(exports, module) {
      var cssKeywords = require_color_name();
      var reverseKeywords = {};
      for (key in cssKeywords) {
        if (cssKeywords.hasOwnProperty(key)) {
          reverseKeywords[cssKeywords[key]] = key;
        }
      }
      var key;
      var convert = module.exports = {
        rgb: { channels: 3, labels: "rgb" },
        hsl: { channels: 3, labels: "hsl" },
        hsv: { channels: 3, labels: "hsv" },
        hwb: { channels: 3, labels: "hwb" },
        cmyk: { channels: 4, labels: "cmyk" },
        xyz: { channels: 3, labels: "xyz" },
        lab: { channels: 3, labels: "lab" },
        lch: { channels: 3, labels: "lch" },
        hex: { channels: 1, labels: ["hex"] },
        keyword: { channels: 1, labels: ["keyword"] },
        ansi16: { channels: 1, labels: ["ansi16"] },
        ansi256: { channels: 1, labels: ["ansi256"] },
        hcg: { channels: 3, labels: ["h", "c", "g"] },
        apple: { channels: 3, labels: ["r16", "g16", "b16"] },
        gray: { channels: 1, labels: ["gray"] }
      };
      for (model in convert) {
        if (convert.hasOwnProperty(model)) {
          if (!("channels" in convert[model])) {
            throw new Error("missing channels property: " + model);
          }
          if (!("labels" in convert[model])) {
            throw new Error("missing channel labels property: " + model);
          }
          if (convert[model].labels.length !== convert[model].channels) {
            throw new Error("channel and label counts mismatch: " + model);
          }
          channels = convert[model].channels;
          labels = convert[model].labels;
          delete convert[model].channels;
          delete convert[model].labels;
          Object.defineProperty(convert[model], "channels", { value: channels });
          Object.defineProperty(convert[model], "labels", { value: labels });
        }
      }
      var channels;
      var labels;
      var model;
      convert.rgb.hsl = function(rgb) {
        var r5 = rgb[0] / 255;
        var g4 = rgb[1] / 255;
        var b4 = rgb[2] / 255;
        var min = Math.min(r5, g4, b4);
        var max = Math.max(r5, g4, b4);
        var delta = max - min;
        var h3;
        var s5;
        var l6;
        if (max === min) {
          h3 = 0;
        } else if (r5 === max) {
          h3 = (g4 - b4) / delta;
        } else if (g4 === max) {
          h3 = 2 + (b4 - r5) / delta;
        } else if (b4 === max) {
          h3 = 4 + (r5 - g4) / delta;
        }
        h3 = Math.min(h3 * 60, 360);
        if (h3 < 0) {
          h3 += 360;
        }
        l6 = (min + max) / 2;
        if (max === min) {
          s5 = 0;
        } else if (l6 <= 0.5) {
          s5 = delta / (max + min);
        } else {
          s5 = delta / (2 - max - min);
        }
        return [h3, s5 * 100, l6 * 100];
      };
      convert.rgb.hsv = function(rgb) {
        var rdif;
        var gdif;
        var bdif;
        var h3;
        var s5;
        var r5 = rgb[0] / 255;
        var g4 = rgb[1] / 255;
        var b4 = rgb[2] / 255;
        var v5 = Math.max(r5, g4, b4);
        var diff = v5 - Math.min(r5, g4, b4);
        var diffc = function(c6) {
          return (v5 - c6) / 6 / diff + 1 / 2;
        };
        if (diff === 0) {
          h3 = s5 = 0;
        } else {
          s5 = diff / v5;
          rdif = diffc(r5);
          gdif = diffc(g4);
          bdif = diffc(b4);
          if (r5 === v5) {
            h3 = bdif - gdif;
          } else if (g4 === v5) {
            h3 = 1 / 3 + rdif - bdif;
          } else if (b4 === v5) {
            h3 = 2 / 3 + gdif - rdif;
          }
          if (h3 < 0) {
            h3 += 1;
          } else if (h3 > 1) {
            h3 -= 1;
          }
        }
        return [
          h3 * 360,
          s5 * 100,
          v5 * 100
        ];
      };
      convert.rgb.hwb = function(rgb) {
        var r5 = rgb[0];
        var g4 = rgb[1];
        var b4 = rgb[2];
        var h3 = convert.rgb.hsl(rgb)[0];
        var w4 = 1 / 255 * Math.min(r5, Math.min(g4, b4));
        b4 = 1 - 1 / 255 * Math.max(r5, Math.max(g4, b4));
        return [h3, w4 * 100, b4 * 100];
      };
      convert.rgb.cmyk = function(rgb) {
        var r5 = rgb[0] / 255;
        var g4 = rgb[1] / 255;
        var b4 = rgb[2] / 255;
        var c6;
        var m3;
        var y3;
        var k3;
        k3 = Math.min(1 - r5, 1 - g4, 1 - b4);
        c6 = (1 - r5 - k3) / (1 - k3) || 0;
        m3 = (1 - g4 - k3) / (1 - k3) || 0;
        y3 = (1 - b4 - k3) / (1 - k3) || 0;
        return [c6 * 100, m3 * 100, y3 * 100, k3 * 100];
      };
      function comparativeDistance(x2, y3) {
        return Math.pow(x2[0] - y3[0], 2) + Math.pow(x2[1] - y3[1], 2) + Math.pow(x2[2] - y3[2], 2);
      }
      convert.rgb.keyword = function(rgb) {
        var reversed = reverseKeywords[rgb];
        if (reversed) {
          return reversed;
        }
        var currentClosestDistance = Infinity;
        var currentClosestKeyword;
        for (var keyword in cssKeywords) {
          if (cssKeywords.hasOwnProperty(keyword)) {
            var value = cssKeywords[keyword];
            var distance = comparativeDistance(rgb, value);
            if (distance < currentClosestDistance) {
              currentClosestDistance = distance;
              currentClosestKeyword = keyword;
            }
          }
        }
        return currentClosestKeyword;
      };
      convert.keyword.rgb = function(keyword) {
        return cssKeywords[keyword];
      };
      convert.rgb.xyz = function(rgb) {
        var r5 = rgb[0] / 255;
        var g4 = rgb[1] / 255;
        var b4 = rgb[2] / 255;
        r5 = r5 > 0.04045 ? Math.pow((r5 + 0.055) / 1.055, 2.4) : r5 / 12.92;
        g4 = g4 > 0.04045 ? Math.pow((g4 + 0.055) / 1.055, 2.4) : g4 / 12.92;
        b4 = b4 > 0.04045 ? Math.pow((b4 + 0.055) / 1.055, 2.4) : b4 / 12.92;
        var x2 = r5 * 0.4124 + g4 * 0.3576 + b4 * 0.1805;
        var y3 = r5 * 0.2126 + g4 * 0.7152 + b4 * 0.0722;
        var z3 = r5 * 0.0193 + g4 * 0.1192 + b4 * 0.9505;
        return [x2 * 100, y3 * 100, z3 * 100];
      };
      convert.rgb.lab = function(rgb) {
        var xyz = convert.rgb.xyz(rgb);
        var x2 = xyz[0];
        var y3 = xyz[1];
        var z3 = xyz[2];
        var l6;
        var a5;
        var b4;
        x2 /= 95.047;
        y3 /= 100;
        z3 /= 108.883;
        x2 = x2 > 8856e-6 ? Math.pow(x2, 1 / 3) : 7.787 * x2 + 16 / 116;
        y3 = y3 > 8856e-6 ? Math.pow(y3, 1 / 3) : 7.787 * y3 + 16 / 116;
        z3 = z3 > 8856e-6 ? Math.pow(z3, 1 / 3) : 7.787 * z3 + 16 / 116;
        l6 = 116 * y3 - 16;
        a5 = 500 * (x2 - y3);
        b4 = 200 * (y3 - z3);
        return [l6, a5, b4];
      };
      convert.hsl.rgb = function(hsl) {
        var h3 = hsl[0] / 360;
        var s5 = hsl[1] / 100;
        var l6 = hsl[2] / 100;
        var t1;
        var t22;
        var t32;
        var rgb;
        var val;
        if (s5 === 0) {
          val = l6 * 255;
          return [val, val, val];
        }
        if (l6 < 0.5) {
          t22 = l6 * (1 + s5);
        } else {
          t22 = l6 + s5 - l6 * s5;
        }
        t1 = 2 * l6 - t22;
        rgb = [0, 0, 0];
        for (var i5 = 0; i5 < 3; i5++) {
          t32 = h3 + 1 / 3 * -(i5 - 1);
          if (t32 < 0) {
            t32++;
          }
          if (t32 > 1) {
            t32--;
          }
          if (6 * t32 < 1) {
            val = t1 + (t22 - t1) * 6 * t32;
          } else if (2 * t32 < 1) {
            val = t22;
          } else if (3 * t32 < 2) {
            val = t1 + (t22 - t1) * (2 / 3 - t32) * 6;
          } else {
            val = t1;
          }
          rgb[i5] = val * 255;
        }
        return rgb;
      };
      convert.hsl.hsv = function(hsl) {
        var h3 = hsl[0];
        var s5 = hsl[1] / 100;
        var l6 = hsl[2] / 100;
        var smin = s5;
        var lmin = Math.max(l6, 0.01);
        var sv;
        var v5;
        l6 *= 2;
        s5 *= l6 <= 1 ? l6 : 2 - l6;
        smin *= lmin <= 1 ? lmin : 2 - lmin;
        v5 = (l6 + s5) / 2;
        sv = l6 === 0 ? 2 * smin / (lmin + smin) : 2 * s5 / (l6 + s5);
        return [h3, sv * 100, v5 * 100];
      };
      convert.hsv.rgb = function(hsv) {
        var h3 = hsv[0] / 60;
        var s5 = hsv[1] / 100;
        var v5 = hsv[2] / 100;
        var hi = Math.floor(h3) % 6;
        var f4 = h3 - Math.floor(h3);
        var p5 = 255 * v5 * (1 - s5);
        var q2 = 255 * v5 * (1 - s5 * f4);
        var t4 = 255 * v5 * (1 - s5 * (1 - f4));
        v5 *= 255;
        switch (hi) {
          case 0:
            return [v5, t4, p5];
          case 1:
            return [q2, v5, p5];
          case 2:
            return [p5, v5, t4];
          case 3:
            return [p5, q2, v5];
          case 4:
            return [t4, p5, v5];
          case 5:
            return [v5, p5, q2];
        }
      };
      convert.hsv.hsl = function(hsv) {
        var h3 = hsv[0];
        var s5 = hsv[1] / 100;
        var v5 = hsv[2] / 100;
        var vmin = Math.max(v5, 0.01);
        var lmin;
        var sl;
        var l6;
        l6 = (2 - s5) * v5;
        lmin = (2 - s5) * vmin;
        sl = s5 * vmin;
        sl /= lmin <= 1 ? lmin : 2 - lmin;
        sl = sl || 0;
        l6 /= 2;
        return [h3, sl * 100, l6 * 100];
      };
      convert.hwb.rgb = function(hwb) {
        var h3 = hwb[0] / 360;
        var wh = hwb[1] / 100;
        var bl = hwb[2] / 100;
        var ratio = wh + bl;
        var i5;
        var v5;
        var f4;
        var n3;
        if (ratio > 1) {
          wh /= ratio;
          bl /= ratio;
        }
        i5 = Math.floor(6 * h3);
        v5 = 1 - bl;
        f4 = 6 * h3 - i5;
        if ((i5 & 1) !== 0) {
          f4 = 1 - f4;
        }
        n3 = wh + f4 * (v5 - wh);
        var r5;
        var g4;
        var b4;
        switch (i5) {
          default:
          case 6:
          case 0:
            r5 = v5;
            g4 = n3;
            b4 = wh;
            break;
          case 1:
            r5 = n3;
            g4 = v5;
            b4 = wh;
            break;
          case 2:
            r5 = wh;
            g4 = v5;
            b4 = n3;
            break;
          case 3:
            r5 = wh;
            g4 = n3;
            b4 = v5;
            break;
          case 4:
            r5 = n3;
            g4 = wh;
            b4 = v5;
            break;
          case 5:
            r5 = v5;
            g4 = wh;
            b4 = n3;
            break;
        }
        return [r5 * 255, g4 * 255, b4 * 255];
      };
      convert.cmyk.rgb = function(cmyk) {
        var c6 = cmyk[0] / 100;
        var m3 = cmyk[1] / 100;
        var y3 = cmyk[2] / 100;
        var k3 = cmyk[3] / 100;
        var r5;
        var g4;
        var b4;
        r5 = 1 - Math.min(1, c6 * (1 - k3) + k3);
        g4 = 1 - Math.min(1, m3 * (1 - k3) + k3);
        b4 = 1 - Math.min(1, y3 * (1 - k3) + k3);
        return [r5 * 255, g4 * 255, b4 * 255];
      };
      convert.xyz.rgb = function(xyz) {
        var x2 = xyz[0] / 100;
        var y3 = xyz[1] / 100;
        var z3 = xyz[2] / 100;
        var r5;
        var g4;
        var b4;
        r5 = x2 * 3.2406 + y3 * -1.5372 + z3 * -0.4986;
        g4 = x2 * -0.9689 + y3 * 1.8758 + z3 * 0.0415;
        b4 = x2 * 0.0557 + y3 * -0.204 + z3 * 1.057;
        r5 = r5 > 31308e-7 ? 1.055 * Math.pow(r5, 1 / 2.4) - 0.055 : r5 * 12.92;
        g4 = g4 > 31308e-7 ? 1.055 * Math.pow(g4, 1 / 2.4) - 0.055 : g4 * 12.92;
        b4 = b4 > 31308e-7 ? 1.055 * Math.pow(b4, 1 / 2.4) - 0.055 : b4 * 12.92;
        r5 = Math.min(Math.max(0, r5), 1);
        g4 = Math.min(Math.max(0, g4), 1);
        b4 = Math.min(Math.max(0, b4), 1);
        return [r5 * 255, g4 * 255, b4 * 255];
      };
      convert.xyz.lab = function(xyz) {
        var x2 = xyz[0];
        var y3 = xyz[1];
        var z3 = xyz[2];
        var l6;
        var a5;
        var b4;
        x2 /= 95.047;
        y3 /= 100;
        z3 /= 108.883;
        x2 = x2 > 8856e-6 ? Math.pow(x2, 1 / 3) : 7.787 * x2 + 16 / 116;
        y3 = y3 > 8856e-6 ? Math.pow(y3, 1 / 3) : 7.787 * y3 + 16 / 116;
        z3 = z3 > 8856e-6 ? Math.pow(z3, 1 / 3) : 7.787 * z3 + 16 / 116;
        l6 = 116 * y3 - 16;
        a5 = 500 * (x2 - y3);
        b4 = 200 * (y3 - z3);
        return [l6, a5, b4];
      };
      convert.lab.xyz = function(lab) {
        var l6 = lab[0];
        var a5 = lab[1];
        var b4 = lab[2];
        var x2;
        var y3;
        var z3;
        y3 = (l6 + 16) / 116;
        x2 = a5 / 500 + y3;
        z3 = y3 - b4 / 200;
        var y22 = Math.pow(y3, 3);
        var x22 = Math.pow(x2, 3);
        var z22 = Math.pow(z3, 3);
        y3 = y22 > 8856e-6 ? y22 : (y3 - 16 / 116) / 7.787;
        x2 = x22 > 8856e-6 ? x22 : (x2 - 16 / 116) / 7.787;
        z3 = z22 > 8856e-6 ? z22 : (z3 - 16 / 116) / 7.787;
        x2 *= 95.047;
        y3 *= 100;
        z3 *= 108.883;
        return [x2, y3, z3];
      };
      convert.lab.lch = function(lab) {
        var l6 = lab[0];
        var a5 = lab[1];
        var b4 = lab[2];
        var hr;
        var h3;
        var c6;
        hr = Math.atan2(b4, a5);
        h3 = hr * 360 / 2 / Math.PI;
        if (h3 < 0) {
          h3 += 360;
        }
        c6 = Math.sqrt(a5 * a5 + b4 * b4);
        return [l6, c6, h3];
      };
      convert.lch.lab = function(lch) {
        var l6 = lch[0];
        var c6 = lch[1];
        var h3 = lch[2];
        var a5;
        var b4;
        var hr;
        hr = h3 / 360 * 2 * Math.PI;
        a5 = c6 * Math.cos(hr);
        b4 = c6 * Math.sin(hr);
        return [l6, a5, b4];
      };
      convert.rgb.ansi16 = function(args) {
        var r5 = args[0];
        var g4 = args[1];
        var b4 = args[2];
        var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2];
        value = Math.round(value / 50);
        if (value === 0) {
          return 30;
        }
        var ansi = 30 + (Math.round(b4 / 255) << 2 | Math.round(g4 / 255) << 1 | Math.round(r5 / 255));
        if (value === 2) {
          ansi += 60;
        }
        return ansi;
      };
      convert.hsv.ansi16 = function(args) {
        return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
      };
      convert.rgb.ansi256 = function(args) {
        var r5 = args[0];
        var g4 = args[1];
        var b4 = args[2];
        if (r5 === g4 && g4 === b4) {
          if (r5 < 8) {
            return 16;
          }
          if (r5 > 248) {
            return 231;
          }
          return Math.round((r5 - 8) / 247 * 24) + 232;
        }
        var ansi = 16 + 36 * Math.round(r5 / 255 * 5) + 6 * Math.round(g4 / 255 * 5) + Math.round(b4 / 255 * 5);
        return ansi;
      };
      convert.ansi16.rgb = function(args) {
        var color = args % 10;
        if (color === 0 || color === 7) {
          if (args > 50) {
            color += 3.5;
          }
          color = color / 10.5 * 255;
          return [color, color, color];
        }
        var mult = (~~(args > 50) + 1) * 0.5;
        var r5 = (color & 1) * mult * 255;
        var g4 = (color >> 1 & 1) * mult * 255;
        var b4 = (color >> 2 & 1) * mult * 255;
        return [r5, g4, b4];
      };
      convert.ansi256.rgb = function(args) {
        if (args >= 232) {
          var c6 = (args - 232) * 10 + 8;
          return [c6, c6, c6];
        }
        args -= 16;
        var rem;
        var r5 = Math.floor(args / 36) / 5 * 255;
        var g4 = Math.floor((rem = args % 36) / 6) / 5 * 255;
        var b4 = rem % 6 / 5 * 255;
        return [r5, g4, b4];
      };
      convert.rgb.hex = function(args) {
        var integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
        var string = integer.toString(16).toUpperCase();
        return "000000".substring(string.length) + string;
      };
      convert.hex.rgb = function(args) {
        var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
        if (!match) {
          return [0, 0, 0];
        }
        var colorString = match[0];
        if (match[0].length === 3) {
          colorString = colorString.split("").map(function(char) {
            return char + char;
          }).join("");
        }
        var integer = parseInt(colorString, 16);
        var r5 = integer >> 16 & 255;
        var g4 = integer >> 8 & 255;
        var b4 = integer & 255;
        return [r5, g4, b4];
      };
      convert.rgb.hcg = function(rgb) {
        var r5 = rgb[0] / 255;
        var g4 = rgb[1] / 255;
        var b4 = rgb[2] / 255;
        var max = Math.max(Math.max(r5, g4), b4);
        var min = Math.min(Math.min(r5, g4), b4);
        var chroma = max - min;
        var grayscale;
        var hue;
        if (chroma < 1) {
          grayscale = min / (1 - chroma);
        } else {
          grayscale = 0;
        }
        if (chroma <= 0) {
          hue = 0;
        } else if (max === r5) {
          hue = (g4 - b4) / chroma % 6;
        } else if (max === g4) {
          hue = 2 + (b4 - r5) / chroma;
        } else {
          hue = 4 + (r5 - g4) / chroma + 4;
        }
        hue /= 6;
        hue %= 1;
        return [hue * 360, chroma * 100, grayscale * 100];
      };
      convert.hsl.hcg = function(hsl) {
        var s5 = hsl[1] / 100;
        var l6 = hsl[2] / 100;
        var c6 = 1;
        var f4 = 0;
        if (l6 < 0.5) {
          c6 = 2 * s5 * l6;
        } else {
          c6 = 2 * s5 * (1 - l6);
        }
        if (c6 < 1) {
          f4 = (l6 - 0.5 * c6) / (1 - c6);
        }
        return [hsl[0], c6 * 100, f4 * 100];
      };
      convert.hsv.hcg = function(hsv) {
        var s5 = hsv[1] / 100;
        var v5 = hsv[2] / 100;
        var c6 = s5 * v5;
        var f4 = 0;
        if (c6 < 1) {
          f4 = (v5 - c6) / (1 - c6);
        }
        return [hsv[0], c6 * 100, f4 * 100];
      };
      convert.hcg.rgb = function(hcg) {
        var h3 = hcg[0] / 360;
        var c6 = hcg[1] / 100;
        var g4 = hcg[2] / 100;
        if (c6 === 0) {
          return [g4 * 255, g4 * 255, g4 * 255];
        }
        var pure = [0, 0, 0];
        var hi = h3 % 1 * 6;
        var v5 = hi % 1;
        var w4 = 1 - v5;
        var mg = 0;
        switch (Math.floor(hi)) {
          case 0:
            pure[0] = 1;
            pure[1] = v5;
            pure[2] = 0;
            break;
          case 1:
            pure[0] = w4;
            pure[1] = 1;
            pure[2] = 0;
            break;
          case 2:
            pure[0] = 0;
            pure[1] = 1;
            pure[2] = v5;
            break;
          case 3:
            pure[0] = 0;
            pure[1] = w4;
            pure[2] = 1;
            break;
          case 4:
            pure[0] = v5;
            pure[1] = 0;
            pure[2] = 1;
            break;
          default:
            pure[0] = 1;
            pure[1] = 0;
            pure[2] = w4;
        }
        mg = (1 - c6) * g4;
        return [
          (c6 * pure[0] + mg) * 255,
          (c6 * pure[1] + mg) * 255,
          (c6 * pure[2] + mg) * 255
        ];
      };
      convert.hcg.hsv = function(hcg) {
        var c6 = hcg[1] / 100;
        var g4 = hcg[2] / 100;
        var v5 = c6 + g4 * (1 - c6);
        var f4 = 0;
        if (v5 > 0) {
          f4 = c6 / v5;
        }
        return [hcg[0], f4 * 100, v5 * 100];
      };
      convert.hcg.hsl = function(hcg) {
        var c6 = hcg[1] / 100;
        var g4 = hcg[2] / 100;
        var l6 = g4 * (1 - c6) + 0.5 * c6;
        var s5 = 0;
        if (l6 > 0 && l6 < 0.5) {
          s5 = c6 / (2 * l6);
        } else if (l6 >= 0.5 && l6 < 1) {
          s5 = c6 / (2 * (1 - l6));
        }
        return [hcg[0], s5 * 100, l6 * 100];
      };
      convert.hcg.hwb = function(hcg) {
        var c6 = hcg[1] / 100;
        var g4 = hcg[2] / 100;
        var v5 = c6 + g4 * (1 - c6);
        return [hcg[0], (v5 - c6) * 100, (1 - v5) * 100];
      };
      convert.hwb.hcg = function(hwb) {
        var w4 = hwb[1] / 100;
        var b4 = hwb[2] / 100;
        var v5 = 1 - b4;
        var c6 = v5 - w4;
        var g4 = 0;
        if (c6 < 1) {
          g4 = (v5 - c6) / (1 - c6);
        }
        return [hwb[0], c6 * 100, g4 * 100];
      };
      convert.apple.rgb = function(apple) {
        return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
      };
      convert.rgb.apple = function(rgb) {
        return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
      };
      convert.gray.rgb = function(args) {
        return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
      };
      convert.gray.hsl = convert.gray.hsv = function(args) {
        return [0, 0, args[0]];
      };
      convert.gray.hwb = function(gray) {
        return [0, 100, gray[0]];
      };
      convert.gray.cmyk = function(gray) {
        return [0, 0, 0, gray[0]];
      };
      convert.gray.lab = function(gray) {
        return [gray[0], 0, 0];
      };
      convert.gray.hex = function(gray) {
        var val = Math.round(gray[0] / 100 * 255) & 255;
        var integer = (val << 16) + (val << 8) + val;
        var string = integer.toString(16).toUpperCase();
        return "000000".substring(string.length) + string;
      };
      convert.rgb.gray = function(rgb) {
        var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
        return [val / 255 * 100];
      };
    }
  });

  // node_modules/color-convert/route.js
  var require_route = __commonJS({
    "node_modules/color-convert/route.js"(exports, module) {
      var conversions = require_conversions();
      function buildGraph() {
        var graph = {};
        var models = Object.keys(conversions);
        for (var len = models.length, i5 = 0; i5 < len; i5++) {
          graph[models[i5]] = {
            // http://jsperf.com/1-vs-infinity
            // micro-opt, but this is simple.
            distance: -1,
            parent: null
          };
        }
        return graph;
      }
      function deriveBFS(fromModel) {
        var graph = buildGraph();
        var queue = [fromModel];
        graph[fromModel].distance = 0;
        while (queue.length) {
          var current = queue.pop();
          var adjacents = Object.keys(conversions[current]);
          for (var len = adjacents.length, i5 = 0; i5 < len; i5++) {
            var adjacent = adjacents[i5];
            var node = graph[adjacent];
            if (node.distance === -1) {
              node.distance = graph[current].distance + 1;
              node.parent = current;
              queue.unshift(adjacent);
            }
          }
        }
        return graph;
      }
      function link(from, to) {
        return function(args) {
          return to(from(args));
        };
      }
      function wrapConversion(toModel, graph) {
        var path = [graph[toModel].parent, toModel];
        var fn = conversions[graph[toModel].parent][toModel];
        var cur = graph[toModel].parent;
        while (graph[cur].parent) {
          path.unshift(graph[cur].parent);
          fn = link(conversions[graph[cur].parent][cur], fn);
          cur = graph[cur].parent;
        }
        fn.conversion = path;
        return fn;
      }
      module.exports = function(fromModel) {
        var graph = deriveBFS(fromModel);
        var conversion = {};
        var models = Object.keys(graph);
        for (var len = models.length, i5 = 0; i5 < len; i5++) {
          var toModel = models[i5];
          var node = graph[toModel];
          if (node.parent === null) {
            continue;
          }
          conversion[toModel] = wrapConversion(toModel, graph);
        }
        return conversion;
      };
    }
  });

  // node_modules/color-convert/index.js
  var require_color_convert = __commonJS({
    "node_modules/color-convert/index.js"(exports, module) {
      var conversions = require_conversions();
      var route = require_route();
      var convert = {};
      var models = Object.keys(conversions);
      function wrapRaw(fn) {
        var wrappedFn = function(args) {
          if (args === void 0 || args === null) {
            return args;
          }
          if (arguments.length > 1) {
            args = Array.prototype.slice.call(arguments);
          }
          return fn(args);
        };
        if ("conversion" in fn) {
          wrappedFn.conversion = fn.conversion;
        }
        return wrappedFn;
      }
      function wrapRounded(fn) {
        var wrappedFn = function(args) {
          if (args === void 0 || args === null) {
            return args;
          }
          if (arguments.length > 1) {
            args = Array.prototype.slice.call(arguments);
          }
          var result = fn(args);
          if (typeof result === "object") {
            for (var len = result.length, i5 = 0; i5 < len; i5++) {
              result[i5] = Math.round(result[i5]);
            }
          }
          return result;
        };
        if ("conversion" in fn) {
          wrappedFn.conversion = fn.conversion;
        }
        return wrappedFn;
      }
      models.forEach(function(fromModel) {
        convert[fromModel] = {};
        Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
        Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
        var routes = route(fromModel);
        var routeModels = Object.keys(routes);
        routeModels.forEach(function(toModel) {
          var fn = routes[toModel];
          convert[fromModel][toModel] = wrapRounded(fn);
          convert[fromModel][toModel].raw = wrapRaw(fn);
        });
      });
      module.exports = convert;
    }
  });

  // node_modules/color-string/color-string.js
  var require_color_string = __commonJS({
    "node_modules/color-string/color-string.js"(exports, module) {
      var colorNames = require_color_name();
      module.exports = {
        getRgba,
        getHsla,
        getRgb,
        getHsl,
        getHwb,
        getAlpha,
        hexString,
        rgbString,
        rgbaString,
        percentString,
        percentaString,
        hslString,
        hslaString,
        hwbString,
        keyword
      };
      function getRgba(string) {
        if (!string) {
          return;
        }
        var abbr = /^#([a-fA-F0-9]{3})$/, hex = /^#([a-fA-F0-9]{6})$/, rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/, per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/, keyword2 = /(\D+)/;
        var rgb = [0, 0, 0], a5 = 1, match = string.match(abbr);
        if (match) {
          match = match[1];
          for (var i5 = 0; i5 < rgb.length; i5++) {
            rgb[i5] = parseInt(match[i5] + match[i5], 16);
          }
        } else if (match = string.match(hex)) {
          match = match[1];
          for (var i5 = 0; i5 < rgb.length; i5++) {
            rgb[i5] = parseInt(match.slice(i5 * 2, i5 * 2 + 2), 16);
          }
        } else if (match = string.match(rgba)) {
          for (var i5 = 0; i5 < rgb.length; i5++) {
            rgb[i5] = parseInt(match[i5 + 1]);
          }
          a5 = parseFloat(match[4]);
        } else if (match = string.match(per)) {
          for (var i5 = 0; i5 < rgb.length; i5++) {
            rgb[i5] = Math.round(parseFloat(match[i5 + 1]) * 2.55);
          }
          a5 = parseFloat(match[4]);
        } else if (match = string.match(keyword2)) {
          if (match[1] == "transparent") {
            return [0, 0, 0, 0];
          }
          rgb = colorNames[match[1]];
          if (!rgb) {
            return;
          }
        }
        for (var i5 = 0; i5 < rgb.length; i5++) {
          rgb[i5] = scale(rgb[i5], 0, 255);
        }
        if (!a5 && a5 != 0) {
          a5 = 1;
        } else {
          a5 = scale(a5, 0, 1);
        }
        rgb[3] = a5;
        return rgb;
      }
      function getHsla(string) {
        if (!string) {
          return;
        }
        var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
        var match = string.match(hsl);
        if (match) {
          var alpha = parseFloat(match[4]);
          var h3 = scale(parseInt(match[1]), 0, 360), s5 = scale(parseFloat(match[2]), 0, 100), l6 = scale(parseFloat(match[3]), 0, 100), a5 = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
          return [h3, s5, l6, a5];
        }
      }
      function getHwb(string) {
        if (!string) {
          return;
        }
        var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
        var match = string.match(hwb);
        if (match) {
          var alpha = parseFloat(match[4]);
          var h3 = scale(parseInt(match[1]), 0, 360), w4 = scale(parseFloat(match[2]), 0, 100), b4 = scale(parseFloat(match[3]), 0, 100), a5 = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
          return [h3, w4, b4, a5];
        }
      }
      function getRgb(string) {
        var rgba = getRgba(string);
        return rgba && rgba.slice(0, 3);
      }
      function getHsl(string) {
        var hsla = getHsla(string);
        return hsla && hsla.slice(0, 3);
      }
      function getAlpha(string) {
        var vals = getRgba(string);
        if (vals) {
          return vals[3];
        } else if (vals = getHsla(string)) {
          return vals[3];
        } else if (vals = getHwb(string)) {
          return vals[3];
        }
      }
      function hexString(rgb) {
        return "#" + hexDouble(rgb[0]) + hexDouble(rgb[1]) + hexDouble(rgb[2]);
      }
      function rgbString(rgba, alpha) {
        if (alpha < 1 || rgba[3] && rgba[3] < 1) {
          return rgbaString(rgba, alpha);
        }
        return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
      }
      function rgbaString(rgba, alpha) {
        if (alpha === void 0) {
          alpha = rgba[3] !== void 0 ? rgba[3] : 1;
        }
        return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + alpha + ")";
      }
      function percentString(rgba, alpha) {
        if (alpha < 1 || rgba[3] && rgba[3] < 1) {
          return percentaString(rgba, alpha);
        }
        var r5 = Math.round(rgba[0] / 255 * 100), g4 = Math.round(rgba[1] / 255 * 100), b4 = Math.round(rgba[2] / 255 * 100);
        return "rgb(" + r5 + "%, " + g4 + "%, " + b4 + "%)";
      }
      function percentaString(rgba, alpha) {
        var r5 = Math.round(rgba[0] / 255 * 100), g4 = Math.round(rgba[1] / 255 * 100), b4 = Math.round(rgba[2] / 255 * 100);
        return "rgba(" + r5 + "%, " + g4 + "%, " + b4 + "%, " + (alpha || rgba[3] || 1) + ")";
      }
      function hslString(hsla, alpha) {
        if (alpha < 1 || hsla[3] && hsla[3] < 1) {
          return hslaString(hsla, alpha);
        }
        return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
      }
      function hslaString(hsla, alpha) {
        if (alpha === void 0) {
          alpha = hsla[3] !== void 0 ? hsla[3] : 1;
        }
        return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + alpha + ")";
      }
      function hwbString(hwb, alpha) {
        if (alpha === void 0) {
          alpha = hwb[3] !== void 0 ? hwb[3] : 1;
        }
        return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%" + (alpha !== void 0 && alpha !== 1 ? ", " + alpha : "") + ")";
      }
      function keyword(rgb) {
        return reverseNames[rgb.slice(0, 3)];
      }
      function scale(num, min, max) {
        return Math.min(Math.max(min, num), max);
      }
      function hexDouble(num) {
        var str = num.toString(16).toUpperCase();
        return str.length < 2 ? "0" + str : str;
      }
      var reverseNames = {};
      for (name in colorNames) {
        reverseNames[colorNames[name]] = name;
      }
      var name;
    }
  });

  // node_modules/color/index.js
  var require_color = __commonJS({
    "node_modules/color/index.js"(exports, module) {
      var clone = require_clone();
      var convert = require_color_convert();
      var string = require_color_string();
      var Color = function(obj) {
        if (obj instanceof Color) {
          return obj;
        }
        if (!(this instanceof Color)) {
          return new Color(obj);
        }
        this.values = {
          rgb: [0, 0, 0],
          hsl: [0, 0, 0],
          hsv: [0, 0, 0],
          hwb: [0, 0, 0],
          cmyk: [0, 0, 0, 0],
          alpha: 1
        };
        var vals;
        if (typeof obj === "string") {
          vals = string.getRgba(obj);
          if (vals) {
            this.setValues("rgb", vals);
          } else if (vals = string.getHsla(obj)) {
            this.setValues("hsl", vals);
          } else if (vals = string.getHwb(obj)) {
            this.setValues("hwb", vals);
          } else {
            throw new Error('Unable to parse color from string "' + obj + '"');
          }
        } else if (typeof obj === "object") {
          vals = obj;
          if (vals.r !== void 0 || vals.red !== void 0) {
            this.setValues("rgb", vals);
          } else if (vals.l !== void 0 || vals.lightness !== void 0) {
            this.setValues("hsl", vals);
          } else if (vals.v !== void 0 || vals.value !== void 0) {
            this.setValues("hsv", vals);
          } else if (vals.w !== void 0 || vals.whiteness !== void 0) {
            this.setValues("hwb", vals);
          } else if (vals.c !== void 0 || vals.cyan !== void 0) {
            this.setValues("cmyk", vals);
          } else {
            throw new Error("Unable to parse color from object " + JSON.stringify(obj));
          }
        }
      };
      Color.prototype = {
        rgb: function() {
          return this.setSpace("rgb", arguments);
        },
        hsl: function() {
          return this.setSpace("hsl", arguments);
        },
        hsv: function() {
          return this.setSpace("hsv", arguments);
        },
        hwb: function() {
          return this.setSpace("hwb", arguments);
        },
        cmyk: function() {
          return this.setSpace("cmyk", arguments);
        },
        rgbArray: function() {
          return this.values.rgb;
        },
        hslArray: function() {
          return this.values.hsl;
        },
        hsvArray: function() {
          return this.values.hsv;
        },
        hwbArray: function() {
          if (this.values.alpha !== 1) {
            return this.values.hwb.concat([this.values.alpha]);
          }
          return this.values.hwb;
        },
        cmykArray: function() {
          return this.values.cmyk;
        },
        rgbaArray: function() {
          var rgb = this.values.rgb;
          return rgb.concat([this.values.alpha]);
        },
        rgbaArrayNormalized: function() {
          var rgb = this.values.rgb;
          var glRgba = [];
          for (var i5 = 0; i5 < 3; i5++) {
            glRgba[i5] = rgb[i5] / 255;
          }
          glRgba.push(this.values.alpha);
          return glRgba;
        },
        hslaArray: function() {
          var hsl = this.values.hsl;
          return hsl.concat([this.values.alpha]);
        },
        alpha: function(val) {
          if (val === void 0) {
            return this.values.alpha;
          }
          this.setValues("alpha", val);
          return this;
        },
        red: function(val) {
          return this.setChannel("rgb", 0, val);
        },
        green: function(val) {
          return this.setChannel("rgb", 1, val);
        },
        blue: function(val) {
          return this.setChannel("rgb", 2, val);
        },
        hue: function(val) {
          if (val) {
            val %= 360;
            val = val < 0 ? 360 + val : val;
          }
          return this.setChannel("hsl", 0, val);
        },
        saturation: function(val) {
          return this.setChannel("hsl", 1, val);
        },
        lightness: function(val) {
          return this.setChannel("hsl", 2, val);
        },
        saturationv: function(val) {
          return this.setChannel("hsv", 1, val);
        },
        whiteness: function(val) {
          return this.setChannel("hwb", 1, val);
        },
        blackness: function(val) {
          return this.setChannel("hwb", 2, val);
        },
        value: function(val) {
          return this.setChannel("hsv", 2, val);
        },
        cyan: function(val) {
          return this.setChannel("cmyk", 0, val);
        },
        magenta: function(val) {
          return this.setChannel("cmyk", 1, val);
        },
        yellow: function(val) {
          return this.setChannel("cmyk", 2, val);
        },
        black: function(val) {
          return this.setChannel("cmyk", 3, val);
        },
        hexString: function() {
          return string.hexString(this.values.rgb);
        },
        rgbString: function() {
          return string.rgbString(this.values.rgb, this.values.alpha);
        },
        rgbaString: function() {
          return string.rgbaString(this.values.rgb, this.values.alpha);
        },
        percentString: function() {
          return string.percentString(this.values.rgb, this.values.alpha);
        },
        hslString: function() {
          return string.hslString(this.values.hsl, this.values.alpha);
        },
        hslaString: function() {
          return string.hslaString(this.values.hsl, this.values.alpha);
        },
        hwbString: function() {
          return string.hwbString(this.values.hwb, this.values.alpha);
        },
        keyword: function() {
          return string.keyword(this.values.rgb, this.values.alpha);
        },
        rgbNumber: function() {
          return this.values.rgb[0] << 16 | this.values.rgb[1] << 8 | this.values.rgb[2];
        },
        luminosity: function() {
          var rgb = this.values.rgb;
          var lum = [];
          for (var i5 = 0; i5 < rgb.length; i5++) {
            var chan = rgb[i5] / 255;
            lum[i5] = chan <= 0.03928 ? chan / 12.92 : Math.pow((chan + 0.055) / 1.055, 2.4);
          }
          return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
        },
        contrast: function(color2) {
          var lum1 = this.luminosity();
          var lum2 = color2.luminosity();
          if (lum1 > lum2) {
            return (lum1 + 0.05) / (lum2 + 0.05);
          }
          return (lum2 + 0.05) / (lum1 + 0.05);
        },
        level: function(color2) {
          var contrastRatio = this.contrast(color2);
          if (contrastRatio >= 7.1) {
            return "AAA";
          }
          return contrastRatio >= 4.5 ? "AA" : "";
        },
        dark: function() {
          var rgb = this.values.rgb;
          var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1e3;
          return yiq < 128;
        },
        light: function() {
          return !this.dark();
        },
        negate: function() {
          var rgb = [];
          for (var i5 = 0; i5 < 3; i5++) {
            rgb[i5] = 255 - this.values.rgb[i5];
          }
          this.setValues("rgb", rgb);
          return this;
        },
        lighten: function(ratio) {
          this.values.hsl[2] += this.values.hsl[2] * ratio;
          this.setValues("hsl", this.values.hsl);
          return this;
        },
        darken: function(ratio) {
          this.values.hsl[2] -= this.values.hsl[2] * ratio;
          this.setValues("hsl", this.values.hsl);
          return this;
        },
        saturate: function(ratio) {
          this.values.hsl[1] += this.values.hsl[1] * ratio;
          this.setValues("hsl", this.values.hsl);
          return this;
        },
        desaturate: function(ratio) {
          this.values.hsl[1] -= this.values.hsl[1] * ratio;
          this.setValues("hsl", this.values.hsl);
          return this;
        },
        whiten: function(ratio) {
          this.values.hwb[1] += this.values.hwb[1] * ratio;
          this.setValues("hwb", this.values.hwb);
          return this;
        },
        blacken: function(ratio) {
          this.values.hwb[2] += this.values.hwb[2] * ratio;
          this.setValues("hwb", this.values.hwb);
          return this;
        },
        greyscale: function() {
          var rgb = this.values.rgb;
          var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
          this.setValues("rgb", [val, val, val]);
          return this;
        },
        clearer: function(ratio) {
          this.setValues("alpha", this.values.alpha - this.values.alpha * ratio);
          return this;
        },
        opaquer: function(ratio) {
          this.setValues("alpha", this.values.alpha + this.values.alpha * ratio);
          return this;
        },
        rotate: function(degrees) {
          var hue = this.values.hsl[0];
          hue = (hue + degrees) % 360;
          hue = hue < 0 ? 360 + hue : hue;
          this.values.hsl[0] = hue;
          this.setValues("hsl", this.values.hsl);
          return this;
        },
        /**
         * Ported from sass implementation in C
         * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
         */
        mix: function(mixinColor, weight) {
          var color1 = this;
          var color2 = mixinColor;
          var p5 = weight === void 0 ? 0.5 : weight;
          var w4 = 2 * p5 - 1;
          var a5 = color1.alpha() - color2.alpha();
          var w1 = ((w4 * a5 === -1 ? w4 : (w4 + a5) / (1 + w4 * a5)) + 1) / 2;
          var w22 = 1 - w1;
          return this.rgb(
            w1 * color1.red() + w22 * color2.red(),
            w1 * color1.green() + w22 * color2.green(),
            w1 * color1.blue() + w22 * color2.blue()
          ).alpha(color1.alpha() * p5 + color2.alpha() * (1 - p5));
        },
        toJSON: function() {
          return this.rgb();
        },
        clone: function() {
          var col = new Color();
          col.values = clone(this.values);
          return col;
        }
      };
      Color.prototype.getValues = function(space) {
        var vals = {};
        for (var i5 = 0; i5 < space.length; i5++) {
          vals[space.charAt(i5)] = this.values[space][i5];
        }
        if (this.values.alpha !== 1) {
          vals.a = this.values.alpha;
        }
        return vals;
      };
      Color.prototype.setValues = function(space, vals) {
        var spaces = {
          rgb: ["red", "green", "blue"],
          hsl: ["hue", "saturation", "lightness"],
          hsv: ["hue", "saturation", "value"],
          hwb: ["hue", "whiteness", "blackness"],
          cmyk: ["cyan", "magenta", "yellow", "black"]
        };
        var maxes = {
          rgb: [255, 255, 255],
          hsl: [360, 100, 100],
          hsv: [360, 100, 100],
          hwb: [360, 100, 100],
          cmyk: [100, 100, 100, 100]
        };
        var i5;
        var alpha = 1;
        if (space === "alpha") {
          alpha = vals;
        } else if (vals.length) {
          this.values[space] = vals.slice(0, space.length);
          alpha = vals[space.length];
        } else if (vals[space.charAt(0)] !== void 0) {
          for (i5 = 0; i5 < space.length; i5++) {
            this.values[space][i5] = vals[space.charAt(i5)];
          }
          alpha = vals.a;
        } else if (vals[spaces[space][0]] !== void 0) {
          var chans = spaces[space];
          for (i5 = 0; i5 < space.length; i5++) {
            this.values[space][i5] = vals[chans[i5]];
          }
          alpha = vals.alpha;
        }
        this.values.alpha = Math.max(0, Math.min(1, alpha === void 0 ? this.values.alpha : alpha));
        if (space === "alpha") {
          return false;
        }
        var capped;
        for (i5 = 0; i5 < space.length; i5++) {
          capped = Math.max(0, Math.min(maxes[space][i5], this.values[space][i5]));
          this.values[space][i5] = Math.round(capped);
        }
        for (var sname in spaces) {
          if (sname !== space) {
            this.values[sname] = convert[space][sname](this.values[space]);
          }
          for (i5 = 0; i5 < sname.length; i5++) {
            capped = Math.max(0, Math.min(maxes[sname][i5], this.values[sname][i5]));
            this.values[sname][i5] = Math.round(capped);
          }
        }
        return true;
      };
      Color.prototype.setSpace = function(space, args) {
        var vals = args[0];
        if (vals === void 0) {
          return this.getValues(space);
        }
        if (typeof vals === "number") {
          vals = Array.prototype.slice.call(args);
        }
        this.setValues(space, vals);
        return this;
      };
      Color.prototype.setChannel = function(space, index, val) {
        if (val === void 0) {
          return this.values[space][index];
        } else if (val === this.values[space][index]) {
          return this;
        }
        this.values[space][index] = val;
        this.setValues(space, this.values[space]);
        return this;
      };
      module.exports = Color;
    }
  });

  // node_modules/jazzicon/colors.js
  var require_colors = __commonJS({
    "node_modules/jazzicon/colors.js"(exports, module) {
      module.exports = [
        "#01888C",
        // teal
        "#FC7500",
        // bright orange
        "#034F5D",
        // dark teal
        "#F73F01",
        // orangered
        "#FC1960",
        // magenta
        "#C7144C",
        // raspberry
        "#F3C100",
        // goldenrod
        "#1598F2",
        // lightning blue
        "#2465E1",
        // sail blue
        "#F19E02"
        // gold
      ];
    }
  });

  // node_modules/jazzicon/index.js
  var require_jazzicon = __commonJS({
    "node_modules/jazzicon/index.js"(exports, module) {
      var MersenneTwister = require_mersenne_twister();
      var paperGen = require_paper();
      var Color = require_color();
      var colors = require_colors();
      var shapeCount = 4;
      module.exports = generateIdenticon;
      var generator;
      function generateIdenticon(diameter, seed) {
        generator = new MersenneTwister(seed);
        var elements = paperGen(diameter);
        var paper = elements.paper;
        var container = elements.container;
        var remainingColors = hueShift(colors.slice(), generator);
        var bkgnd = paper.rect(0, 0, diameter, diameter);
        bkgnd.attr("fill", genColor(remainingColors));
        bkgnd.attr("stroke", "none");
        for (var i5 = 0; i5 < shapeCount - 1; i5++) {
          genShape(paper, remainingColors, diameter, i5, shapeCount - 1);
        }
        return container;
      }
      function genShape(paper, remainingColors, diameter, i5, total) {
        var shape = paper.rect(0, 0, diameter, diameter);
        shape.rotate(360 * generator.random());
        var trans = diameter / total * generator.random() + i5 * diameter / total;
        shape.translate(trans);
        shape.rotate(180 * generator.random());
        shape.attr("fill", genColor(remainingColors));
        shape.attr("stroke", "none");
      }
      function genColor(colors2) {
        var rand = generator.random();
        var idx = Math.floor(colors2.length * generator.random());
        var color = colors2.splice(idx, 1)[0];
        return color;
      }
      var wobble = 30;
      function hueShift(colors2, generator2) {
        var amount = generator2.random() * 30 - wobble / 2;
        return colors2.map(function(hex) {
          var color = Color(hex);
          color.rotate(amount);
          return color.hexString();
        });
      }
    }
  });

  // app/web-components.tsx
  var import_buffer = __toESM(require_buffer());

  // node_modules/preact/dist/preact.module.js
  var n;
  var l;
  var u;
  var i;
  var t;
  var o;
  var r;
  var f;
  var e;
  var c = {};
  var s = [];
  var a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  var v = Array.isArray;
  function h(n3, l6) {
    for (var u5 in l6)
      n3[u5] = l6[u5];
    return n3;
  }
  function p(n3) {
    var l6 = n3.parentNode;
    l6 && l6.removeChild(n3);
  }
  function y(l6, u5, i5) {
    var t4, o5, r5, f4 = {};
    for (r5 in u5)
      "key" == r5 ? t4 = u5[r5] : "ref" == r5 ? o5 = u5[r5] : f4[r5] = u5[r5];
    if (arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i5), "function" == typeof l6 && null != l6.defaultProps)
      for (r5 in l6.defaultProps)
        void 0 === f4[r5] && (f4[r5] = l6.defaultProps[r5]);
    return d(l6, f4, t4, o5, null);
  }
  function d(n3, i5, t4, o5, r5) {
    var f4 = { type: n3, props: i5, key: t4, ref: o5, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == r5 ? ++u : r5 };
    return null == r5 && null != l.vnode && l.vnode(f4), f4;
  }
  function k(n3) {
    return n3.children;
  }
  function b(n3, l6) {
    this.props = n3, this.context = l6;
  }
  function g(n3, l6) {
    if (null == l6)
      return n3.__ ? g(n3.__, n3.__.__k.indexOf(n3) + 1) : null;
    for (var u5; l6 < n3.__k.length; l6++)
      if (null != (u5 = n3.__k[l6]) && null != u5.__e)
        return u5.__e;
    return "function" == typeof n3.type ? g(n3) : null;
  }
  function m(n3) {
    var l6, u5;
    if (null != (n3 = n3.__) && null != n3.__c) {
      for (n3.__e = n3.__c.base = null, l6 = 0; l6 < n3.__k.length; l6++)
        if (null != (u5 = n3.__k[l6]) && null != u5.__e) {
          n3.__e = n3.__c.base = u5.__e;
          break;
        }
      return m(n3);
    }
  }
  function w(n3) {
    (!n3.__d && (n3.__d = true) && t.push(n3) && !x.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(x);
  }
  function x() {
    var n3, l6, u5, i5, o5, r5, e4, c6;
    for (t.sort(f); n3 = t.shift(); )
      n3.__d && (l6 = t.length, i5 = void 0, o5 = void 0, e4 = (r5 = (u5 = n3).__v).__e, (c6 = u5.__P) && (i5 = [], (o5 = h({}, r5)).__v = r5.__v + 1, L(c6, r5, o5, u5.__n, void 0 !== c6.ownerSVGElement, null != r5.__h ? [e4] : null, i5, null == e4 ? g(r5) : e4, r5.__h), M(i5, r5), r5.__e != e4 && m(r5)), t.length > l6 && t.sort(f));
    x.__r = 0;
  }
  function P(n3, l6, u5, i5, t4, o5, r5, f4, e4, a5) {
    var h3, p5, y3, _4, b4, m3, w4, x2 = i5 && i5.__k || s, P2 = x2.length;
    for (u5.__k = [], h3 = 0; h3 < l6.length; h3++)
      if (null != (_4 = u5.__k[h3] = null == (_4 = l6[h3]) || "boolean" == typeof _4 || "function" == typeof _4 ? null : "string" == typeof _4 || "number" == typeof _4 || "bigint" == typeof _4 ? d(null, _4, null, null, _4) : v(_4) ? d(k, { children: _4 }, null, null, null) : _4.__b > 0 ? d(_4.type, _4.props, _4.key, _4.ref ? _4.ref : null, _4.__v) : _4)) {
        if (_4.__ = u5, _4.__b = u5.__b + 1, null === (y3 = x2[h3]) || y3 && _4.key == y3.key && _4.type === y3.type)
          x2[h3] = void 0;
        else
          for (p5 = 0; p5 < P2; p5++) {
            if ((y3 = x2[p5]) && _4.key == y3.key && _4.type === y3.type) {
              x2[p5] = void 0;
              break;
            }
            y3 = null;
          }
        L(n3, _4, y3 = y3 || c, t4, o5, r5, f4, e4, a5), b4 = _4.__e, (p5 = _4.ref) && y3.ref != p5 && (w4 || (w4 = []), y3.ref && w4.push(y3.ref, null, _4), w4.push(p5, _4.__c || b4, _4)), null != b4 ? (null == m3 && (m3 = b4), "function" == typeof _4.type && _4.__k === y3.__k ? _4.__d = e4 = C(_4, e4, n3) : e4 = $(n3, _4, y3, x2, b4, e4), "function" == typeof u5.type && (u5.__d = e4)) : e4 && y3.__e == e4 && e4.parentNode != n3 && (e4 = g(y3));
      }
    for (u5.__e = m3, h3 = P2; h3--; )
      null != x2[h3] && ("function" == typeof u5.type && null != x2[h3].__e && x2[h3].__e == u5.__d && (u5.__d = A(i5).nextSibling), q(x2[h3], x2[h3]));
    if (w4)
      for (h3 = 0; h3 < w4.length; h3++)
        O(w4[h3], w4[++h3], w4[++h3]);
  }
  function C(n3, l6, u5) {
    for (var i5, t4 = n3.__k, o5 = 0; t4 && o5 < t4.length; o5++)
      (i5 = t4[o5]) && (i5.__ = n3, l6 = "function" == typeof i5.type ? C(i5, l6, u5) : $(u5, i5, i5, t4, i5.__e, l6));
    return l6;
  }
  function $(n3, l6, u5, i5, t4, o5) {
    var r5, f4, e4;
    if (void 0 !== l6.__d)
      r5 = l6.__d, l6.__d = void 0;
    else if (null == u5 || t4 != o5 || null == t4.parentNode)
      n:
        if (null == o5 || o5.parentNode !== n3)
          n3.appendChild(t4), r5 = null;
        else {
          for (f4 = o5, e4 = 0; (f4 = f4.nextSibling) && e4 < i5.length; e4 += 1)
            if (f4 == t4)
              break n;
          n3.insertBefore(t4, o5), r5 = o5;
        }
    return void 0 !== r5 ? r5 : t4.nextSibling;
  }
  function A(n3) {
    var l6, u5, i5;
    if (null == n3.type || "string" == typeof n3.type)
      return n3.__e;
    if (n3.__k) {
      for (l6 = n3.__k.length - 1; l6 >= 0; l6--)
        if ((u5 = n3.__k[l6]) && (i5 = A(u5)))
          return i5;
    }
    return null;
  }
  function H(n3, l6, u5, i5, t4) {
    var o5;
    for (o5 in u5)
      "children" === o5 || "key" === o5 || o5 in l6 || T(n3, o5, null, u5[o5], i5);
    for (o5 in l6)
      t4 && "function" != typeof l6[o5] || "children" === o5 || "key" === o5 || "value" === o5 || "checked" === o5 || u5[o5] === l6[o5] || T(n3, o5, l6[o5], u5[o5], i5);
  }
  function I(n3, l6, u5) {
    "-" === l6[0] ? n3.setProperty(l6, null == u5 ? "" : u5) : n3[l6] = null == u5 ? "" : "number" != typeof u5 || a.test(l6) ? u5 : u5 + "px";
  }
  function T(n3, l6, u5, i5, t4) {
    var o5;
    n:
      if ("style" === l6)
        if ("string" == typeof u5)
          n3.style.cssText = u5;
        else {
          if ("string" == typeof i5 && (n3.style.cssText = i5 = ""), i5)
            for (l6 in i5)
              u5 && l6 in u5 || I(n3.style, l6, "");
          if (u5)
            for (l6 in u5)
              i5 && u5[l6] === i5[l6] || I(n3.style, l6, u5[l6]);
        }
      else if ("o" === l6[0] && "n" === l6[1])
        o5 = l6 !== (l6 = l6.replace(/Capture$/, "")), l6 = l6.toLowerCase() in n3 ? l6.toLowerCase().slice(2) : l6.slice(2), n3.l || (n3.l = {}), n3.l[l6 + o5] = u5, u5 ? i5 || n3.addEventListener(l6, o5 ? z : j, o5) : n3.removeEventListener(l6, o5 ? z : j, o5);
      else if ("dangerouslySetInnerHTML" !== l6) {
        if (t4)
          l6 = l6.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" !== l6 && "height" !== l6 && "href" !== l6 && "list" !== l6 && "form" !== l6 && "tabIndex" !== l6 && "download" !== l6 && "rowSpan" !== l6 && "colSpan" !== l6 && l6 in n3)
          try {
            n3[l6] = null == u5 ? "" : u5;
            break n;
          } catch (n4) {
          }
        "function" == typeof u5 || (null == u5 || false === u5 && "-" !== l6[4] ? n3.removeAttribute(l6) : n3.setAttribute(l6, u5));
      }
  }
  function j(n3) {
    return this.l[n3.type + false](l.event ? l.event(n3) : n3);
  }
  function z(n3) {
    return this.l[n3.type + true](l.event ? l.event(n3) : n3);
  }
  function L(n3, u5, i5, t4, o5, r5, f4, e4, c6) {
    var s5, a5, p5, y3, d5, _4, g4, m3, w4, x2, C2, S, $2, A2, H2, I2 = u5.type;
    if (void 0 !== u5.constructor)
      return null;
    null != i5.__h && (c6 = i5.__h, e4 = u5.__e = i5.__e, u5.__h = null, r5 = [e4]), (s5 = l.__b) && s5(u5);
    try {
      n:
        if ("function" == typeof I2) {
          if (m3 = u5.props, w4 = (s5 = I2.contextType) && t4[s5.__c], x2 = s5 ? w4 ? w4.props.value : s5.__ : t4, i5.__c ? g4 = (a5 = u5.__c = i5.__c).__ = a5.__E : ("prototype" in I2 && I2.prototype.render ? u5.__c = a5 = new I2(m3, x2) : (u5.__c = a5 = new b(m3, x2), a5.constructor = I2, a5.render = B), w4 && w4.sub(a5), a5.props = m3, a5.state || (a5.state = {}), a5.context = x2, a5.__n = t4, p5 = a5.__d = true, a5.__h = [], a5._sb = []), null == a5.__s && (a5.__s = a5.state), null != I2.getDerivedStateFromProps && (a5.__s == a5.state && (a5.__s = h({}, a5.__s)), h(a5.__s, I2.getDerivedStateFromProps(m3, a5.__s))), y3 = a5.props, d5 = a5.state, a5.__v = u5, p5)
            null == I2.getDerivedStateFromProps && null != a5.componentWillMount && a5.componentWillMount(), null != a5.componentDidMount && a5.__h.push(a5.componentDidMount);
          else {
            if (null == I2.getDerivedStateFromProps && m3 !== y3 && null != a5.componentWillReceiveProps && a5.componentWillReceiveProps(m3, x2), !a5.__e && null != a5.shouldComponentUpdate && false === a5.shouldComponentUpdate(m3, a5.__s, x2) || u5.__v === i5.__v) {
              for (u5.__v !== i5.__v && (a5.props = m3, a5.state = a5.__s, a5.__d = false), a5.__e = false, u5.__e = i5.__e, u5.__k = i5.__k, u5.__k.forEach(function(n4) {
                n4 && (n4.__ = u5);
              }), C2 = 0; C2 < a5._sb.length; C2++)
                a5.__h.push(a5._sb[C2]);
              a5._sb = [], a5.__h.length && f4.push(a5);
              break n;
            }
            null != a5.componentWillUpdate && a5.componentWillUpdate(m3, a5.__s, x2), null != a5.componentDidUpdate && a5.__h.push(function() {
              a5.componentDidUpdate(y3, d5, _4);
            });
          }
          if (a5.context = x2, a5.props = m3, a5.__P = n3, S = l.__r, $2 = 0, "prototype" in I2 && I2.prototype.render) {
            for (a5.state = a5.__s, a5.__d = false, S && S(u5), s5 = a5.render(a5.props, a5.state, a5.context), A2 = 0; A2 < a5._sb.length; A2++)
              a5.__h.push(a5._sb[A2]);
            a5._sb = [];
          } else
            do {
              a5.__d = false, S && S(u5), s5 = a5.render(a5.props, a5.state, a5.context), a5.state = a5.__s;
            } while (a5.__d && ++$2 < 25);
          a5.state = a5.__s, null != a5.getChildContext && (t4 = h(h({}, t4), a5.getChildContext())), p5 || null == a5.getSnapshotBeforeUpdate || (_4 = a5.getSnapshotBeforeUpdate(y3, d5)), P(n3, v(H2 = null != s5 && s5.type === k && null == s5.key ? s5.props.children : s5) ? H2 : [H2], u5, i5, t4, o5, r5, f4, e4, c6), a5.base = u5.__e, u5.__h = null, a5.__h.length && f4.push(a5), g4 && (a5.__E = a5.__ = null), a5.__e = false;
        } else
          null == r5 && u5.__v === i5.__v ? (u5.__k = i5.__k, u5.__e = i5.__e) : u5.__e = N(i5.__e, u5, i5, t4, o5, r5, f4, c6);
      (s5 = l.diffed) && s5(u5);
    } catch (n4) {
      u5.__v = null, (c6 || null != r5) && (u5.__e = e4, u5.__h = !!c6, r5[r5.indexOf(e4)] = null), l.__e(n4, u5, i5);
    }
  }
  function M(n3, u5) {
    l.__c && l.__c(u5, n3), n3.some(function(u6) {
      try {
        n3 = u6.__h, u6.__h = [], n3.some(function(n4) {
          n4.call(u6);
        });
      } catch (n4) {
        l.__e(n4, u6.__v);
      }
    });
  }
  function N(l6, u5, i5, t4, o5, r5, f4, e4) {
    var s5, a5, h3, y3 = i5.props, d5 = u5.props, _4 = u5.type, k3 = 0;
    if ("svg" === _4 && (o5 = true), null != r5) {
      for (; k3 < r5.length; k3++)
        if ((s5 = r5[k3]) && "setAttribute" in s5 == !!_4 && (_4 ? s5.localName === _4 : 3 === s5.nodeType)) {
          l6 = s5, r5[k3] = null;
          break;
        }
    }
    if (null == l6) {
      if (null === _4)
        return document.createTextNode(d5);
      l6 = o5 ? document.createElementNS("http://www.w3.org/2000/svg", _4) : document.createElement(_4, d5.is && d5), r5 = null, e4 = false;
    }
    if (null === _4)
      y3 === d5 || e4 && l6.data === d5 || (l6.data = d5);
    else {
      if (r5 = r5 && n.call(l6.childNodes), a5 = (y3 = i5.props || c).dangerouslySetInnerHTML, h3 = d5.dangerouslySetInnerHTML, !e4) {
        if (null != r5)
          for (y3 = {}, k3 = 0; k3 < l6.attributes.length; k3++)
            y3[l6.attributes[k3].name] = l6.attributes[k3].value;
        (h3 || a5) && (h3 && (a5 && h3.__html == a5.__html || h3.__html === l6.innerHTML) || (l6.innerHTML = h3 && h3.__html || ""));
      }
      if (H(l6, d5, y3, o5, e4), h3)
        u5.__k = [];
      else if (P(l6, v(k3 = u5.props.children) ? k3 : [k3], u5, i5, t4, o5 && "foreignObject" !== _4, r5, f4, r5 ? r5[0] : i5.__k && g(i5, 0), e4), null != r5)
        for (k3 = r5.length; k3--; )
          null != r5[k3] && p(r5[k3]);
      e4 || ("value" in d5 && void 0 !== (k3 = d5.value) && (k3 !== l6.value || "progress" === _4 && !k3 || "option" === _4 && k3 !== y3.value) && T(l6, "value", k3, y3.value, false), "checked" in d5 && void 0 !== (k3 = d5.checked) && k3 !== l6.checked && T(l6, "checked", k3, y3.checked, false));
    }
    return l6;
  }
  function O(n3, u5, i5) {
    try {
      "function" == typeof n3 ? n3(u5) : n3.current = u5;
    } catch (n4) {
      l.__e(n4, i5);
    }
  }
  function q(n3, u5, i5) {
    var t4, o5;
    if (l.unmount && l.unmount(n3), (t4 = n3.ref) && (t4.current && t4.current !== n3.__e || O(t4, null, u5)), null != (t4 = n3.__c)) {
      if (t4.componentWillUnmount)
        try {
          t4.componentWillUnmount();
        } catch (n4) {
          l.__e(n4, u5);
        }
      t4.base = t4.__P = null, n3.__c = void 0;
    }
    if (t4 = n3.__k)
      for (o5 = 0; o5 < t4.length; o5++)
        t4[o5] && q(t4[o5], u5, i5 || "function" != typeof n3.type);
    i5 || null == n3.__e || p(n3.__e), n3.__ = n3.__e = n3.__d = void 0;
  }
  function B(n3, l6, u5) {
    return this.constructor(n3, u5);
  }
  function D(u5, i5, t4) {
    var o5, r5, f4;
    l.__ && l.__(u5, i5), r5 = (o5 = "function" == typeof t4) ? null : t4 && t4.__k || i5.__k, f4 = [], L(i5, u5 = (!o5 && t4 || i5).__k = y(k, null, [u5]), r5 || c, c, void 0 !== i5.ownerSVGElement, !o5 && t4 ? [t4] : r5 ? null : i5.firstChild ? n.call(i5.childNodes) : null, f4, !o5 && t4 ? t4 : r5 ? r5.__e : i5.firstChild, o5), M(f4, u5);
  }
  function E(n3, l6) {
    D(n3, l6, E);
  }
  function F(l6, u5, i5) {
    var t4, o5, r5, f4, e4 = h({}, l6.props);
    for (r5 in l6.type && l6.type.defaultProps && (f4 = l6.type.defaultProps), u5)
      "key" == r5 ? t4 = u5[r5] : "ref" == r5 ? o5 = u5[r5] : e4[r5] = void 0 === u5[r5] && void 0 !== f4 ? f4[r5] : u5[r5];
    return arguments.length > 2 && (e4.children = arguments.length > 3 ? n.call(arguments, 2) : i5), d(l6.type, e4, t4 || l6.key, o5 || l6.ref, null);
  }
  n = s.slice, l = { __e: function(n3, l6, u5, i5) {
    for (var t4, o5, r5; l6 = l6.__; )
      if ((t4 = l6.__c) && !t4.__)
        try {
          if ((o5 = t4.constructor) && null != o5.getDerivedStateFromError && (t4.setState(o5.getDerivedStateFromError(n3)), r5 = t4.__d), null != t4.componentDidCatch && (t4.componentDidCatch(n3, i5 || {}), r5 = t4.__d), r5)
            return t4.__E = t4;
        } catch (l7) {
          n3 = l7;
        }
    throw n3;
  } }, u = 0, i = function(n3) {
    return null != n3 && void 0 === n3.constructor;
  }, b.prototype.setState = function(n3, l6) {
    var u5;
    u5 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = h({}, this.state), "function" == typeof n3 && (n3 = n3(h({}, u5), this.props)), n3 && h(u5, n3), null != n3 && this.__v && (l6 && this._sb.push(l6), w(this));
  }, b.prototype.forceUpdate = function(n3) {
    this.__v && (this.__e = true, n3 && this.__h.push(n3), w(this));
  }, b.prototype.render = k, t = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n3, l6) {
    return n3.__v.__b - l6.__v.__b;
  }, x.__r = 0, e = 0;

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var r2;
  var u2;
  var i2;
  var o2 = 0;
  var f2 = [];
  var c2 = [];
  var e2 = l.__b;
  var a2 = l.__r;
  var v2 = l.diffed;
  var l2 = l.__c;
  var m2 = l.unmount;
  function d2(t4, u5) {
    l.__h && l.__h(r2, t4, o2 || u5), o2 = 0;
    var i5 = r2.__H || (r2.__H = { __: [], __h: [] });
    return t4 >= i5.__.length && i5.__.push({ __V: c2 }), i5.__[t4];
  }
  function p2(u5, i5) {
    var o5 = d2(t2++, 3);
    !l.__s && z2(o5.__H, i5) && (o5.__ = u5, o5.i = i5, r2.__H.__h.push(o5));
  }
  function _(n3) {
    return o2 = 5, F2(function() {
      return { current: n3 };
    }, []);
  }
  function F2(n3, r5) {
    var u5 = d2(t2++, 7);
    return z2(u5.__H, r5) ? (u5.__V = n3(), u5.i = r5, u5.__h = n3, u5.__V) : u5.__;
  }
  function b2() {
    for (var t4; t4 = f2.shift(); )
      if (t4.__P && t4.__H)
        try {
          t4.__H.__h.forEach(k2), t4.__H.__h.forEach(w2), t4.__H.__h = [];
        } catch (r5) {
          t4.__H.__h = [], l.__e(r5, t4.__v);
        }
  }
  l.__b = function(n3) {
    r2 = null, e2 && e2(n3);
  }, l.__r = function(n3) {
    a2 && a2(n3), t2 = 0;
    var i5 = (r2 = n3.__c).__H;
    i5 && (u2 === r2 ? (i5.__h = [], r2.__h = [], i5.__.forEach(function(n4) {
      n4.__N && (n4.__ = n4.__N), n4.__V = c2, n4.__N = n4.i = void 0;
    })) : (i5.__h.forEach(k2), i5.__h.forEach(w2), i5.__h = [], t2 = 0)), u2 = r2;
  }, l.diffed = function(t4) {
    v2 && v2(t4);
    var o5 = t4.__c;
    o5 && o5.__H && (o5.__H.__h.length && (1 !== f2.push(o5) && i2 === l.requestAnimationFrame || ((i2 = l.requestAnimationFrame) || j2)(b2)), o5.__H.__.forEach(function(n3) {
      n3.i && (n3.__H = n3.i), n3.__V !== c2 && (n3.__ = n3.__V), n3.i = void 0, n3.__V = c2;
    })), u2 = r2 = null;
  }, l.__c = function(t4, r5) {
    r5.some(function(t5) {
      try {
        t5.__h.forEach(k2), t5.__h = t5.__h.filter(function(n3) {
          return !n3.__ || w2(n3);
        });
      } catch (u5) {
        r5.some(function(n3) {
          n3.__h && (n3.__h = []);
        }), r5 = [], l.__e(u5, t5.__v);
      }
    }), l2 && l2(t4, r5);
  }, l.unmount = function(t4) {
    m2 && m2(t4);
    var r5, u5 = t4.__c;
    u5 && u5.__H && (u5.__H.__.forEach(function(n3) {
      try {
        k2(n3);
      } catch (n4) {
        r5 = n4;
      }
    }), u5.__H = void 0, r5 && l.__e(r5, u5.__v));
  };
  var g2 = "function" == typeof requestAnimationFrame;
  function j2(n3) {
    var t4, r5 = function() {
      clearTimeout(u5), g2 && cancelAnimationFrame(t4), setTimeout(n3);
    }, u5 = setTimeout(r5, 100);
    g2 && (t4 = requestAnimationFrame(r5));
  }
  function k2(n3) {
    var t4 = r2, u5 = n3.__c;
    "function" == typeof u5 && (n3.__c = void 0, u5()), r2 = t4;
  }
  function w2(n3) {
    var t4 = r2;
    n3.__c = n3.__(), r2 = t4;
  }
  function z2(n3, t4) {
    return !n3 || n3.length !== t4.length || t4.some(function(t5, r5) {
      return t5 !== n3[r5];
    });
  }

  // node_modules/@preact/signals-core/dist/signals-core.module.js
  function i3() {
    throw new Error("Cycle detected");
  }
  function t3() {
    if (!(h2 > 1)) {
      var i5, t4 = false;
      while (void 0 !== n2) {
        var o5 = n2;
        n2 = void 0;
        s2++;
        while (void 0 !== o5) {
          var r5 = o5.o;
          o5.o = void 0;
          o5.f &= -3;
          if (!(8 & o5.f) && c3(o5))
            try {
              o5.c();
            } catch (o6) {
              if (!t4) {
                i5 = o6;
                t4 = true;
              }
            }
          o5 = r5;
        }
      }
      s2 = 0;
      h2--;
      if (t4)
        throw i5;
    } else
      h2--;
  }
  var r3 = void 0;
  var n2 = void 0;
  var h2 = 0;
  var s2 = 0;
  var f3 = 0;
  function v3(i5) {
    if (void 0 !== r3) {
      var t4 = i5.n;
      if (void 0 === t4 || t4.t !== r3) {
        t4 = { i: 0, S: i5, p: r3.s, n: void 0, t: r3, e: void 0, x: void 0, r: t4 };
        if (void 0 !== r3.s)
          r3.s.n = t4;
        r3.s = t4;
        i5.n = t4;
        if (32 & r3.f)
          i5.S(t4);
        return t4;
      } else if (-1 === t4.i) {
        t4.i = 0;
        if (void 0 !== t4.n) {
          t4.n.p = t4.p;
          if (void 0 !== t4.p)
            t4.p.n = t4.n;
          t4.p = r3.s;
          t4.n = void 0;
          r3.s.n = t4;
          r3.s = t4;
        }
        return t4;
      }
    }
  }
  function e3(i5) {
    this.v = i5;
    this.i = 0;
    this.n = void 0;
    this.t = void 0;
  }
  e3.prototype.h = function() {
    return true;
  };
  e3.prototype.S = function(i5) {
    if (this.t !== i5 && void 0 === i5.e) {
      i5.x = this.t;
      if (void 0 !== this.t)
        this.t.e = i5;
      this.t = i5;
    }
  };
  e3.prototype.U = function(i5) {
    if (void 0 !== this.t) {
      var t4 = i5.e, o5 = i5.x;
      if (void 0 !== t4) {
        t4.x = o5;
        i5.e = void 0;
      }
      if (void 0 !== o5) {
        o5.e = t4;
        i5.x = void 0;
      }
      if (i5 === this.t)
        this.t = o5;
    }
  };
  e3.prototype.subscribe = function(i5) {
    var t4 = this;
    return b3(function() {
      var o5 = t4.value, r5 = 32 & this.f;
      this.f &= -33;
      try {
        i5(o5);
      } finally {
        this.f |= r5;
      }
    });
  };
  e3.prototype.valueOf = function() {
    return this.value;
  };
  e3.prototype.toString = function() {
    return this.value + "";
  };
  e3.prototype.toJSON = function() {
    return this.value;
  };
  e3.prototype.peek = function() {
    return this.v;
  };
  Object.defineProperty(e3.prototype, "value", { get: function() {
    var i5 = v3(this);
    if (void 0 !== i5)
      i5.i = this.i;
    return this.v;
  }, set: function(o5) {
    if (r3 instanceof l3)
      !function() {
        throw new Error("Computed cannot have side-effects");
      }();
    if (o5 !== this.v) {
      if (s2 > 100)
        i3();
      this.v = o5;
      this.i++;
      f3++;
      h2++;
      try {
        for (var n3 = this.t; void 0 !== n3; n3 = n3.x)
          n3.t.N();
      } finally {
        t3();
      }
    }
  } });
  function u3(i5) {
    return new e3(i5);
  }
  function c3(i5) {
    for (var t4 = i5.s; void 0 !== t4; t4 = t4.n)
      if (t4.S.i !== t4.i || !t4.S.h() || t4.S.i !== t4.i)
        return true;
    return false;
  }
  function d3(i5) {
    for (var t4 = i5.s; void 0 !== t4; t4 = t4.n) {
      var o5 = t4.S.n;
      if (void 0 !== o5)
        t4.r = o5;
      t4.S.n = t4;
      t4.i = -1;
      if (void 0 === t4.n) {
        i5.s = t4;
        break;
      }
    }
  }
  function a3(i5) {
    var t4 = i5.s, o5 = void 0;
    while (void 0 !== t4) {
      var r5 = t4.p;
      if (-1 === t4.i) {
        t4.S.U(t4);
        if (void 0 !== r5)
          r5.n = t4.n;
        if (void 0 !== t4.n)
          t4.n.p = r5;
      } else
        o5 = t4;
      t4.S.n = t4.r;
      if (void 0 !== t4.r)
        t4.r = void 0;
      t4 = r5;
    }
    i5.s = o5;
  }
  function l3(i5) {
    e3.call(this, void 0);
    this.x = i5;
    this.s = void 0;
    this.g = f3 - 1;
    this.f = 4;
  }
  (l3.prototype = new e3()).h = function() {
    this.f &= -3;
    if (1 & this.f)
      return false;
    if (32 == (36 & this.f))
      return true;
    this.f &= -5;
    if (this.g === f3)
      return true;
    this.g = f3;
    this.f |= 1;
    if (this.i > 0 && !c3(this)) {
      this.f &= -2;
      return true;
    }
    var i5 = r3;
    try {
      d3(this);
      r3 = this;
      var t4 = this.x();
      if (16 & this.f || this.v !== t4 || 0 === this.i) {
        this.v = t4;
        this.f &= -17;
        this.i++;
      }
    } catch (i6) {
      this.v = i6;
      this.f |= 16;
      this.i++;
    }
    r3 = i5;
    a3(this);
    this.f &= -2;
    return true;
  };
  l3.prototype.S = function(i5) {
    if (void 0 === this.t) {
      this.f |= 36;
      for (var t4 = this.s; void 0 !== t4; t4 = t4.n)
        t4.S.S(t4);
    }
    e3.prototype.S.call(this, i5);
  };
  l3.prototype.U = function(i5) {
    if (void 0 !== this.t) {
      e3.prototype.U.call(this, i5);
      if (void 0 === this.t) {
        this.f &= -33;
        for (var t4 = this.s; void 0 !== t4; t4 = t4.n)
          t4.S.U(t4);
      }
    }
  };
  l3.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 6;
      for (var i5 = this.t; void 0 !== i5; i5 = i5.x)
        i5.t.N();
    }
  };
  l3.prototype.peek = function() {
    if (!this.h())
      i3();
    if (16 & this.f)
      throw this.v;
    return this.v;
  };
  Object.defineProperty(l3.prototype, "value", { get: function() {
    if (1 & this.f)
      i3();
    var t4 = v3(this);
    this.h();
    if (void 0 !== t4)
      t4.i = this.i;
    if (16 & this.f)
      throw this.v;
    return this.v;
  } });
  function w3(i5) {
    return new l3(i5);
  }
  function y2(i5) {
    var o5 = i5.u;
    i5.u = void 0;
    if ("function" == typeof o5) {
      h2++;
      var n3 = r3;
      r3 = void 0;
      try {
        o5();
      } catch (t4) {
        i5.f &= -2;
        i5.f |= 8;
        _2(i5);
        throw t4;
      } finally {
        r3 = n3;
        t3();
      }
    }
  }
  function _2(i5) {
    for (var t4 = i5.s; void 0 !== t4; t4 = t4.n)
      t4.S.U(t4);
    i5.x = void 0;
    i5.s = void 0;
    y2(i5);
  }
  function p3(i5) {
    if (r3 !== this)
      throw new Error("Out-of-order effect");
    a3(this);
    r3 = i5;
    this.f &= -2;
    if (8 & this.f)
      _2(this);
    t3();
  }
  function g3(i5) {
    this.x = i5;
    this.u = void 0;
    this.s = void 0;
    this.o = void 0;
    this.f = 32;
  }
  g3.prototype.c = function() {
    var i5 = this.S();
    try {
      if (8 & this.f)
        return;
      if (void 0 === this.x)
        return;
      var t4 = this.x();
      if ("function" == typeof t4)
        this.u = t4;
    } finally {
      i5();
    }
  };
  g3.prototype.S = function() {
    if (1 & this.f)
      i3();
    this.f |= 1;
    this.f &= -9;
    y2(this);
    d3(this);
    h2++;
    var t4 = r3;
    r3 = this;
    return p3.bind(this, t4);
  };
  g3.prototype.N = function() {
    if (!(2 & this.f)) {
      this.f |= 2;
      this.o = n2;
      n2 = this;
    }
  };
  g3.prototype.d = function() {
    this.f |= 8;
    if (!(1 & this.f))
      _2(this);
  };
  function b3(i5) {
    var t4 = new g3(i5);
    try {
      t4.c();
    } catch (i6) {
      t4.d();
      throw i6;
    }
    return t4.d.bind(t4);
  }

  // node_modules/@preact/signals/dist/signals.module.js
  var c4;
  var v4;
  function s3(n3, i5) {
    l[n3] = i5.bind(null, l[n3] || function() {
    });
  }
  function l4(n3) {
    if (v4)
      v4();
    v4 = n3 && n3.S();
  }
  function d4(n3) {
    var r5 = this, t4 = n3.data, f4 = useSignal(t4);
    f4.value = t4;
    var o5 = F2(function() {
      var n4 = r5.__v;
      while (n4 = n4.__)
        if (n4.__c) {
          n4.__c.__$f |= 4;
          break;
        }
      r5.__$u.c = function() {
        r5.base.data = o5.peek();
      };
      return w3(function() {
        var n5 = f4.value.value;
        return 0 === n5 ? 0 : true === n5 ? "" : n5 || "";
      });
    }, []);
    return o5.value;
  }
  d4.displayName = "_st";
  Object.defineProperties(e3.prototype, { constructor: { configurable: true, value: void 0 }, type: { configurable: true, value: d4 }, props: { configurable: true, get: function() {
    return { data: this };
  } }, __b: { configurable: true, value: 1 } });
  s3("__b", function(n3, r5) {
    if ("string" == typeof r5.type) {
      var i5, t4 = r5.props;
      for (var f4 in t4)
        if ("children" !== f4) {
          var e4 = t4[f4];
          if (e4 instanceof e3) {
            if (!i5)
              r5.__np = i5 = {};
            i5[f4] = e4;
            t4[f4] = e4.peek();
          }
        }
    }
    n3(r5);
  });
  s3("__r", function(n3, r5) {
    l4();
    var i5, t4 = r5.__c;
    if (t4) {
      t4.__$f &= -2;
      if (void 0 === (i5 = t4.__$u))
        t4.__$u = i5 = function(n4) {
          var r6;
          b3(function() {
            r6 = this;
          });
          r6.c = function() {
            t4.__$f |= 1;
            t4.setState({});
          };
          return r6;
        }();
    }
    c4 = t4;
    l4(i5);
    n3(r5);
  });
  s3("__e", function(n3, r5, i5, t4) {
    l4();
    c4 = void 0;
    n3(r5, i5, t4);
  });
  s3("diffed", function(n3, r5) {
    l4();
    c4 = void 0;
    var i5;
    if ("string" == typeof r5.type && (i5 = r5.__e)) {
      var t4 = r5.__np, f4 = r5.props;
      if (t4) {
        var o5 = i5.U;
        if (o5)
          for (var e4 in o5) {
            var u5 = o5[e4];
            if (void 0 !== u5 && !(e4 in t4)) {
              u5.d();
              o5[e4] = void 0;
            }
          }
        else
          i5.U = o5 = {};
        for (var a5 in t4) {
          var v5 = o5[a5], s5 = t4[a5];
          if (void 0 === v5) {
            v5 = p4(i5, a5, s5, f4);
            o5[a5] = v5;
          } else
            v5.o(s5, f4);
        }
      }
    }
    n3(r5);
  });
  function p4(n3, r5, i5, t4) {
    var f4 = r5 in n3 && void 0 === n3.ownerSVGElement, o5 = u3(i5);
    return { o: function(n4, r6) {
      o5.value = n4;
      t4 = r6;
    }, d: b3(function() {
      var i6 = o5.value.value;
      if (t4[r5] !== i6) {
        t4[r5] = i6;
        if (f4)
          n3[r5] = i6;
        else if (i6)
          n3.setAttribute(r5, i6);
        else
          n3.removeAttribute(r5);
      }
    }) };
  }
  s3("unmount", function(n3, r5) {
    if ("string" == typeof r5.type) {
      var i5 = r5.__e;
      if (i5) {
        var t4 = i5.U;
        if (t4) {
          i5.U = void 0;
          for (var f4 in t4) {
            var o5 = t4[f4];
            if (o5)
              o5.d();
          }
        }
      }
    } else {
      var e4 = r5.__c;
      if (e4) {
        var u5 = e4.__$u;
        if (u5) {
          e4.__$u = void 0;
          u5.d();
        }
      }
    }
    n3(r5);
  });
  s3("__h", function(n3, r5, i5, t4) {
    if (t4 < 3)
      r5.__$f |= 2;
    n3(r5, i5, t4);
  });
  b.prototype.shouldComponentUpdate = function(n3, r5) {
    var i5 = this.__$u;
    if (!(i5 && void 0 !== i5.s || 4 & this.__$f))
      return true;
    if (3 & this.__$f)
      return true;
    for (var t4 in r5)
      return true;
    for (var f4 in n3)
      if ("__source" !== f4 && n3[f4] !== this.props[f4])
        return true;
    for (var o5 in this.props)
      if (!(o5 in n3))
        return true;
    return false;
  };
  function useSignal(n3) {
    return F2(function() {
      return u3(n3);
    }, []);
  }

  // app/web-components.tsx
  var import_jazzicon = __toESM(require_jazzicon());

  // node_modules/preact-custom-element/dist/preact-custom-element.esm.js
  function r4() {
    return (r4 = Object.assign || function(t4) {
      for (var e4 = 1; e4 < arguments.length; e4++) {
        var n3 = arguments[e4];
        for (var o5 in n3)
          Object.prototype.hasOwnProperty.call(n3, o5) && (t4[o5] = n3[o5]);
      }
      return t4;
    }).apply(this, arguments);
  }
  function i4(t4) {
    this.getChildContext = function() {
      return t4.context;
    };
    var e4 = t4.children, n3 = function(t5, e5) {
      if (null == t5)
        return {};
      var n4, o5, r5 = {}, i5 = Object.keys(t5);
      for (o5 = 0; o5 < i5.length; o5++)
        e5.indexOf(n4 = i5[o5]) >= 0 || (r5[n4] = t5[n4]);
      return r5;
    }(t4, ["context", "children"]);
    return F(e4, n3);
  }
  function a4() {
    var o5 = new CustomEvent("_preact", { detail: {}, bubbles: true, cancelable: true });
    this.dispatchEvent(o5), this._vdom = y(i4, r4({}, this._props, { context: o5.detail.context }), function e4(n3, o6) {
      if (3 === n3.nodeType)
        return n3.data;
      if (1 !== n3.nodeType)
        return null;
      var r5 = [], i5 = {}, a5 = 0, c6 = n3.attributes, l6 = n3.childNodes;
      for (a5 = c6.length; a5--; )
        "slot" !== c6[a5].name && (i5[c6[a5].name] = c6[a5].value, i5[s4(c6[a5].name)] = c6[a5].value);
      for (a5 = l6.length; a5--; ) {
        var p5 = e4(l6[a5], null), d5 = l6[a5].slot;
        d5 ? i5[d5] = y(u4, { name: d5 }, p5) : r5[a5] = p5;
      }
      var h3 = o6 ? y(u4, null, r5) : r5;
      return y(o6 || n3.nodeName.toLowerCase(), i5, h3);
    }(this, this._vdomComponent)), (this.hasAttribute("hydrate") ? E : D)(this._vdom, this._root);
  }
  function s4(t4) {
    return t4.replace(/-(\w)/g, function(t5, e4) {
      return e4 ? e4.toUpperCase() : "";
    });
  }
  function c5(t4, e4, r5) {
    if (this._vdom) {
      var i5 = {};
      i5[t4] = r5 = null == r5 ? void 0 : r5, i5[s4(t4)] = r5, this._vdom = F(this._vdom, i5), D(this._vdom, this._root);
    }
  }
  function l5() {
    D(this._vdom = null, this._root);
  }
  function u4(e4, n3) {
    var o5 = this;
    return y("slot", r4({}, e4, { ref: function(t4) {
      t4 ? (o5.ref = t4, o5._listener || (o5._listener = function(t5) {
        t5.stopPropagation(), t5.detail.context = n3;
      }, t4.addEventListener("_preact", o5._listener))) : o5.ref.removeEventListener("_preact", o5._listener);
    } }));
  }
  function preact_custom_element_esm_default(t4, e4, n3, o5) {
    function r5() {
      var e5 = Reflect.construct(HTMLElement, [], r5);
      return e5._vdomComponent = t4, e5._root = o5 && o5.shadow ? e5.attachShadow({ mode: "open" }) : e5, e5;
    }
    return (r5.prototype = Object.create(HTMLElement.prototype)).constructor = r5, r5.prototype.connectedCallback = a4, r5.prototype.attributeChangedCallback = c5, r5.prototype.disconnectedCallback = l5, n3 = n3 || t4.observedAttributes || Object.keys(t4.propTypes || {}), r5.observedAttributes = n3, n3.forEach(function(t5) {
      Object.defineProperty(r5.prototype, t5, { get: function() {
        return this._vdom.props[t5];
      }, set: function(e5) {
        this._vdom ? this.attributeChangedCallback(t5, null, e5) : (this._props || (this._props = {}), this._props[t5] = e5, this.connectedCallback());
        var n4 = typeof e5;
        null != e5 && "string" !== n4 && "boolean" !== n4 && "number" !== n4 || this.setAttribute(t5, e5);
      } });
    }), customElements.define(e4 || t4.tagName || t4.displayName || t4.name, r5);
  }

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var _3 = 0;
  function o4(o5, e4, n3, t4, f4, l6) {
    var s5, u5, a5 = {};
    for (u5 in e4)
      "ref" == u5 ? s5 = e4[u5] : a5[u5] = e4[u5];
    var i5 = { type: o5, props: a5, key: n3, ref: s5, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_3, __source: f4, __self: l6 };
    if ("function" == typeof o5 && (s5 = o5.defaultProps))
      for (u5 in s5)
        void 0 === a5[u5] && (a5[u5] = s5[u5]);
    return l.vnode && l.vnode(i5), i5;
  }

  // app/web-components.tsx
  var ethereum = window.ethereum;
  var cookieStore = window.cookieStore;
  var XIcon = class extends b {
    render(props) {
      let { wallet, size } = props;
      const div = _(null);
      const icon = (0, import_jazzicon.default)(
        parseInt(size || "32", 10),
        parseInt(wallet.slice(2, 10), 16)
      );
      icon.style.clipPath = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
      p2(() => {
        div.current.appendChild(icon);
      });
      return /* @__PURE__ */ o4("div", { class: "x-icon", ref: div });
    }
  };
  // Register as <x-greeting>:
  __publicField(XIcon, "tagName", "x-icon");
  // Track these attributes:
  __publicField(XIcon, "observedAttributes", ["name"]);
  preact_custom_element_esm_default(XIcon);
  var accounts;
  var ACCOUNT_KEY = "accounts";
  async function fetchStorage() {
    if (sessionStorage.getItem(ACCOUNT_KEY) && ethereum.isConnected) {
      try {
        accounts = JSON.parse(sessionStorage.getItem(ACCOUNT_KEY));
        return true;
      } catch (e4) {
        sessionStorage.removeItem(ACCOUNT_KEY);
      }
    }
    return false;
  }
  async function connect() {
    await fetchStorage();
    if (accounts) {
      return;
    }
    try {
      accounts = await ethereum.request({ method: "eth_requestAccounts" });
      sessionStorage.setItem(ACCOUNT_KEY, JSON.stringify(accounts));
    } catch (e4) {
      if (e4.code === 4001) {
        console.log("Please connect to MetaMask.");
      } else {
        console.error(e4);
      }
    }
  }
  var COOKIE_KEY = "yofolk-auth";
  async function hasCookie() {
    if (await cookieStore.get(COOKIE_KEY)) {
      try {
        return true;
      } catch (e4) {
        cookieStore.delete(COOKIE_KEY);
      }
    }
    return false;
  }
  var account = u3(void 0);
  async function initSession() {
    if (ethereum && await hasCookie() && await fetchStorage()) {
      account.value = accounts[0];
    }
  }
  initSession();
  b3(() => {
    if (account.value) {
      document.body.classList.add("signed-in");
    } else {
      document.body.classList.remove("signed-in");
    }
  });
  var SignOut = () => {
    function signout() {
      cookieStore.delete(COOKIE_KEY);
      cookieStore.delete(COOKIE_KEY);
      account.value = void 0;
      accounts = void 0;
      location.reload();
    }
    return /* @__PURE__ */ o4("button", { onClick: signout, children: "Sign out" });
  };
  var SignedIn = (props) => {
    return /* @__PURE__ */ o4(k, { children: [
      /* @__PURE__ */ o4("span", { children: [
        "Signed in as ",
        props.wallet
      ] }),
      " ",
      /* @__PURE__ */ o4(SignOut, {})
    ] });
  };
  var XSignIn = class extends b {
    onClick = async () => {
      if (!accounts) {
        await connect();
      }
      if (!accounts) {
        return;
      }
      const domain = window.location.host;
      const from = accounts[0];
      const nonce = Math.floor(16777215 * Math.random());
      const date = (/* @__PURE__ */ new Date()).toISOString();
      const siweMessage = `I accept the YoFolk Terms of Service.

Account: ${from}
URI: https://${domain}
Version: 1
Chain ID: 1
Nonce: ${nonce}
Issued At: ${date}`;
      const msg = `0x${import_buffer.Buffer.from(siweMessage, "utf8").toString("hex")}`;
      const signature = await ethereum.request({
        method: "personal_sign",
        params: [msg, from]
      });
      account.value = from;
      cookieStore.set(COOKIE_KEY, signature);
      try {
      } catch (err) {
        console.error(err);
        this.setState({ error: err.message });
      }
    };
    render(props) {
      if (!ethereum) {
        return /* @__PURE__ */ o4("span", {});
      }
      if (account.value) {
        return /* @__PURE__ */ o4(SignedIn, { wallet: account.value });
      }
      let { value } = props;
      return /* @__PURE__ */ o4("div", { children: [
        this.state.error,
        /* @__PURE__ */ o4("button", { onClick: this.onClick, class: "x-signin", children: value || "Sign in" })
      ] });
    }
  };
  // Register as <x-greeting>:
  __publicField(XSignIn, "tagName", "x-sign-in");
  // Track these attributes:
  __publicField(XSignIn, "observedAttributes", ["name"]);
  preact_custom_element_esm_default(XSignIn);
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
