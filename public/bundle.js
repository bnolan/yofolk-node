(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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
      for (i4 = 0, len = code.length; i4 < len; ++i4) {
        lookup[i4] = code[i4];
        revLookup[code.charCodeAt(i4)] = i4;
      }
      var i4;
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
        var i5;
        for (i5 = 0; i5 < len2; i5 += 4) {
          tmp = revLookup[b64.charCodeAt(i5)] << 18 | revLookup[b64.charCodeAt(i5 + 1)] << 12 | revLookup[b64.charCodeAt(i5 + 2)] << 6 | revLookup[b64.charCodeAt(i5 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i5)] << 2 | revLookup[b64.charCodeAt(i5 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i5)] << 10 | revLookup[b64.charCodeAt(i5 + 1)] << 4 | revLookup[b64.charCodeAt(i5 + 2)] >> 2;
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
        for (var i5 = start; i5 < end; i5 += 3) {
          tmp = (uint8[i5] << 16 & 16711680) + (uint8[i5 + 1] << 8 & 65280) + (uint8[i5 + 2] & 255);
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
        for (var i5 = 0, len22 = len2 - extraBytes; i5 < len22; i5 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i5, i5 + maxChunkLength > len22 ? len22 : i5 + maxChunkLength));
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
        var e3, m3;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i4 = isLE ? nBytes - 1 : 0;
        var d3 = isLE ? -1 : 1;
        var s3 = buffer[offset + i4];
        i4 += d3;
        e3 = s3 & (1 << -nBits) - 1;
        s3 >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e3 = e3 * 256 + buffer[offset + i4], i4 += d3, nBits -= 8) {
        }
        m3 = e3 & (1 << -nBits) - 1;
        e3 >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m3 = m3 * 256 + buffer[offset + i4], i4 += d3, nBits -= 8) {
        }
        if (e3 === 0) {
          e3 = 1 - eBias;
        } else if (e3 === eMax) {
          return m3 ? NaN : (s3 ? -1 : 1) * Infinity;
        } else {
          m3 = m3 + Math.pow(2, mLen);
          e3 = e3 - eBias;
        }
        return (s3 ? -1 : 1) * m3 * Math.pow(2, e3 - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e3, m3, c4;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i4 = isLE ? 0 : nBytes - 1;
        var d3 = isLE ? 1 : -1;
        var s3 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m3 = isNaN(value) ? 1 : 0;
          e3 = eMax;
        } else {
          e3 = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c4 = Math.pow(2, -e3)) < 1) {
            e3--;
            c4 *= 2;
          }
          if (e3 + eBias >= 1) {
            value += rt / c4;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c4 >= 2) {
            e3++;
            c4 /= 2;
          }
          if (e3 + eBias >= eMax) {
            m3 = 0;
            e3 = eMax;
          } else if (e3 + eBias >= 1) {
            m3 = (value * c4 - 1) * Math.pow(2, mLen);
            e3 = e3 + eBias;
          } else {
            m3 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e3 = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i4] = m3 & 255, i4 += d3, m3 /= 256, mLen -= 8) {
        }
        e3 = e3 << mLen | m3;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i4] = e3 & 255, i4 += d3, e3 /= 256, eLen -= 8) {
        }
        buffer[offset + i4 - d3] |= s3 * 128;
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
        } catch (e3) {
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
        const b3 = fromObject(value);
        if (b3)
          return b3;
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
        for (let i4 = 0; i4 < length; i4 += 1) {
          buf[i4] = array[i4] & 255;
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
      Buffer3.isBuffer = function isBuffer(b3) {
        return b3 != null && b3._isBuffer === true && b3 !== Buffer3.prototype;
      };
      Buffer3.compare = function compare(a4, b3) {
        if (isInstance(a4, Uint8Array))
          a4 = Buffer3.from(a4, a4.offset, a4.byteLength);
        if (isInstance(b3, Uint8Array))
          b3 = Buffer3.from(b3, b3.offset, b3.byteLength);
        if (!Buffer3.isBuffer(a4) || !Buffer3.isBuffer(b3)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a4 === b3)
          return 0;
        let x2 = a4.length;
        let y2 = b3.length;
        for (let i4 = 0, len = Math.min(x2, y2); i4 < len; ++i4) {
          if (a4[i4] !== b3[i4]) {
            x2 = a4[i4];
            y2 = b3[i4];
            break;
          }
        }
        if (x2 < y2)
          return -1;
        if (y2 < x2)
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
        let i4;
        if (length === void 0) {
          length = 0;
          for (i4 = 0; i4 < list.length; ++i4) {
            length += list[i4].length;
          }
        }
        const buffer = Buffer3.allocUnsafe(length);
        let pos = 0;
        for (i4 = 0; i4 < list.length; ++i4) {
          let buf = list[i4];
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
      function swap(b3, n2, m3) {
        const i4 = b3[n2];
        b3[n2] = b3[m3];
        b3[m3] = i4;
      }
      Buffer3.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i4 = 0; i4 < len; i4 += 2) {
          swap(this, i4, i4 + 1);
        }
        return this;
      };
      Buffer3.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i4 = 0; i4 < len; i4 += 4) {
          swap(this, i4, i4 + 3);
          swap(this, i4 + 1, i4 + 2);
        }
        return this;
      };
      Buffer3.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i4 = 0; i4 < len; i4 += 8) {
          swap(this, i4, i4 + 7);
          swap(this, i4 + 1, i4 + 6);
          swap(this, i4 + 2, i4 + 5);
          swap(this, i4 + 3, i4 + 4);
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
      Buffer3.prototype.equals = function equals(b3) {
        if (!Buffer3.isBuffer(b3))
          throw new TypeError("Argument must be a Buffer");
        if (this === b3)
          return true;
        return Buffer3.compare(this, b3) === 0;
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
        let y2 = end - start;
        const len = Math.min(x2, y2);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i4 = 0; i4 < len; ++i4) {
          if (thisCopy[i4] !== targetCopy[i4]) {
            x2 = thisCopy[i4];
            y2 = targetCopy[i4];
            break;
          }
        }
        if (x2 < y2)
          return -1;
        if (y2 < x2)
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
        function read(buf, i5) {
          if (indexSize === 1) {
            return buf[i5];
          } else {
            return buf.readUInt16BE(i5 * indexSize);
          }
        }
        let i4;
        if (dir) {
          let foundIndex = -1;
          for (i4 = byteOffset; i4 < arrLength; i4++) {
            if (read(arr, i4) === read(val, foundIndex === -1 ? 0 : i4 - foundIndex)) {
              if (foundIndex === -1)
                foundIndex = i4;
              if (i4 - foundIndex + 1 === valLength)
                return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1)
                i4 -= i4 - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength)
            byteOffset = arrLength - valLength;
          for (i4 = byteOffset; i4 >= 0; i4--) {
            let found = true;
            for (let j3 = 0; j3 < valLength; j3++) {
              if (read(arr, i4 + j3) !== read(val, j3)) {
                found = false;
                break;
              }
            }
            if (found)
              return i4;
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
        let i4;
        for (i4 = 0; i4 < length; ++i4) {
          const parsed = parseInt(string.substr(i4 * 2, 2), 16);
          if (numberIsNaN(parsed))
            return i4;
          buf[offset + i4] = parsed;
        }
        return i4;
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
        let i4 = start;
        while (i4 < end) {
          const firstByte = buf[i4];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i4 + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i4 + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i4 + 1];
                thirdByte = buf[i4 + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i4 + 1];
                thirdByte = buf[i4 + 2];
                fourthByte = buf[i4 + 3];
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
          i4 += bytesPerSequence;
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
        let i4 = 0;
        while (i4 < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i4, i4 += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i4 = start; i4 < end; ++i4) {
          ret += String.fromCharCode(buf[i4] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i4 = start; i4 < end; ++i4) {
          ret += String.fromCharCode(buf[i4]);
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
        for (let i4 = start; i4 < end; ++i4) {
          out += hexSliceLookupTable[buf[i4]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i4 = 0; i4 < bytes.length - 1; i4 += 2) {
          res += String.fromCharCode(bytes[i4] + bytes[i4 + 1] * 256);
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
        let i4 = 0;
        while (++i4 < byteLength2 && (mul *= 256)) {
          val += this[offset + i4] * mul;
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
        let i4 = 0;
        while (++i4 < byteLength2 && (mul *= 256)) {
          val += this[offset + i4] * mul;
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
        let i4 = byteLength2;
        let mul = 1;
        let val = this[offset + --i4];
        while (i4 > 0 && (mul *= 256)) {
          val += this[offset + --i4] * mul;
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
        let i4 = 0;
        this[offset] = value & 255;
        while (++i4 < byteLength2 && (mul *= 256)) {
          this[offset + i4] = value / mul & 255;
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
        let i4 = byteLength2 - 1;
        let mul = 1;
        this[offset + i4] = value & 255;
        while (--i4 >= 0 && (mul *= 256)) {
          this[offset + i4] = value / mul & 255;
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
        let i4 = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i4 < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i4 - 1] !== 0) {
            sub = 1;
          }
          this[offset + i4] = (value / mul >> 0) - sub & 255;
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
        let i4 = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i4] = value & 255;
        while (--i4 >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i4 + 1] !== 0) {
            sub = 1;
          }
          this[offset + i4] = (value / mul >> 0) - sub & 255;
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
        let i4;
        if (typeof val === "number") {
          for (i4 = start; i4 < end; ++i4) {
            this[i4] = val;
          }
        } else {
          const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i4 = 0; i4 < end - start; ++i4) {
            this[i4 + start] = bytes[i4 % len];
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
        let i4 = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i4 >= start + 4; i4 -= 3) {
          res = `_${val.slice(i4 - 3, i4)}${res}`;
        }
        return `${val.slice(0, i4)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n2 = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n2} and < 2${n2} ** ${(byteLength2 + 1) * 8}${n2}`;
            } else {
              range = `>= -(2${n2} ** ${(byteLength2 + 1) * 8 - 1}${n2}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n2}`;
            }
          } else {
            range = `>= ${min}${n2} and <= ${max}${n2}`;
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
        for (let i4 = 0; i4 < length; ++i4) {
          codePoint = string.charCodeAt(i4);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              } else if (i4 + 1 === length) {
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
        for (let i4 = 0; i4 < str.length; ++i4) {
          byteArray.push(str.charCodeAt(i4) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c4, hi, lo;
        const byteArray = [];
        for (let i4 = 0; i4 < str.length; ++i4) {
          if ((units -= 2) < 0)
            break;
          c4 = str.charCodeAt(i4);
          hi = c4 >> 8;
          lo = c4 % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i4;
        for (i4 = 0; i4 < length; ++i4) {
          if (i4 + offset >= dst.length || i4 >= src.length)
            break;
          dst[i4 + offset] = src[i4];
        }
        return i4;
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
        for (let i4 = 0; i4 < 16; ++i4) {
          const i16 = i4 * 16;
          for (let j3 = 0; j3 < 16; ++j3) {
            table[i16 + j3] = alphabet[i4] + alphabet[j3];
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
      MersenneTwister.prototype.init_seed = function(s3) {
        this.mt[0] = s3 >>> 0;
        for (this.mti = 1; this.mti < this.N; this.mti++) {
          var s3 = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
          this.mt[this.mti] = (((s3 & 4294901760) >>> 16) * 1812433253 << 16) + (s3 & 65535) * 1812433253 + this.mti;
          this.mt[this.mti] >>>= 0;
        }
      };
      MersenneTwister.prototype.init_by_array = function(init_key, key_length) {
        var i4, j3, k3;
        this.init_seed(19650218);
        i4 = 1;
        j3 = 0;
        k3 = this.N > key_length ? this.N : key_length;
        for (; k3; k3--) {
          var s3 = this.mt[i4 - 1] ^ this.mt[i4 - 1] >>> 30;
          this.mt[i4] = (this.mt[i4] ^ (((s3 & 4294901760) >>> 16) * 1664525 << 16) + (s3 & 65535) * 1664525) + init_key[j3] + j3;
          this.mt[i4] >>>= 0;
          i4++;
          j3++;
          if (i4 >= this.N) {
            this.mt[0] = this.mt[this.N - 1];
            i4 = 1;
          }
          if (j3 >= key_length)
            j3 = 0;
        }
        for (k3 = this.N - 1; k3; k3--) {
          var s3 = this.mt[i4 - 1] ^ this.mt[i4 - 1] >>> 30;
          this.mt[i4] = (this.mt[i4] ^ (((s3 & 4294901760) >>> 16) * 1566083941 << 16) + (s3 & 65535) * 1566083941) - i4;
          this.mt[i4] >>>= 0;
          i4++;
          if (i4 >= this.N) {
            this.mt[0] = this.mt[this.N - 1];
            i4 = 1;
          }
        }
        this.mt[0] = 2147483648;
      };
      MersenneTwister.prototype.random_int = function() {
        var y2;
        var mag01 = new Array(0, this.MATRIX_A);
        if (this.mti >= this.N) {
          var kk;
          if (this.mti == this.N + 1)
            this.init_seed(5489);
          for (kk = 0; kk < this.N - this.M; kk++) {
            y2 = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
            this.mt[kk] = this.mt[kk + this.M] ^ y2 >>> 1 ^ mag01[y2 & 1];
          }
          for (; kk < this.N - 1; kk++) {
            y2 = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
            this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ y2 >>> 1 ^ mag01[y2 & 1];
          }
          y2 = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK;
          this.mt[this.N - 1] = this.mt[this.M - 1] ^ y2 >>> 1 ^ mag01[y2 & 1];
          this.mti = 0;
        }
        y2 = this.mt[this.mti++];
        y2 ^= y2 >>> 11;
        y2 ^= y2 << 7 & 2636928640;
        y2 ^= y2 << 15 & 4022730752;
        y2 ^= y2 >>> 18;
        return y2 >>> 0;
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
        var a4 = this.random_int() >>> 5, b3 = this.random_int() >>> 6;
        return (a4 * 67108864 + b3) * (1 / 9007199254740992);
      };
      module.exports = MersenneTwister;
    }
  });

  // node_modules/raphael/raphael.min.js
  var require_raphael_min = __commonJS({
    "node_modules/raphael/raphael.min.js"(exports, module) {
      !function(t3, e3) {
        "object" == typeof exports && "object" == typeof module ? module.exports = e3() : "function" == typeof define && define.amd ? define([], e3) : "object" == typeof exports ? exports.Raphael = e3() : t3.Raphael = e3();
      }(window, function() {
        return function(t3) {
          var e3 = {};
          function r4(i4) {
            if (e3[i4])
              return e3[i4].exports;
            var n2 = e3[i4] = { i: i4, l: false, exports: {} };
            return t3[i4].call(n2.exports, n2, n2.exports, r4), n2.l = true, n2.exports;
          }
          return r4.m = t3, r4.c = e3, r4.d = function(t4, e4, i4) {
            r4.o(t4, e4) || Object.defineProperty(t4, e4, { enumerable: true, get: i4 });
          }, r4.r = function(t4) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t4, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t4, "__esModule", { value: true });
          }, r4.t = function(t4, e4) {
            if (1 & e4 && (t4 = r4(t4)), 8 & e4)
              return t4;
            if (4 & e4 && "object" == typeof t4 && t4 && t4.__esModule)
              return t4;
            var i4 = /* @__PURE__ */ Object.create(null);
            if (r4.r(i4), Object.defineProperty(i4, "default", { enumerable: true, value: t4 }), 2 & e4 && "string" != typeof t4)
              for (var n2 in t4)
                r4.d(i4, n2, function(e5) {
                  return t4[e5];
                }.bind(null, n2));
            return i4;
          }, r4.n = function(t4) {
            var e4 = t4 && t4.__esModule ? function() {
              return t4.default;
            } : function() {
              return t4;
            };
            return r4.d(e4, "a", e4), e4;
          }, r4.o = function(t4, e4) {
            return Object.prototype.hasOwnProperty.call(t4, e4);
          }, r4.p = "", r4(r4.s = 1);
        }([function(t3, e3, r4) {
          var i4, n2;
          i4 = [r4(2)], void 0 === (n2 = function(t4) {
            function e4(i6) {
              if (e4.is(i6, "function"))
                return r5 ? i6() : t4.on("raphael.DOMload", i6);
              if (e4.is(i6, A2))
                return e4._engine.create[c4](e4, i6.splice(0, 3 + e4.is(i6[0], T2))).add(i6);
              var n4 = Array.prototype.slice.call(arguments, 0);
              if (e4.is(n4[n4.length - 1], "function")) {
                var a5 = n4.pop();
                return r5 ? a5.call(e4._engine.create[c4](e4, n4)) : t4.on("raphael.DOMload", function() {
                  a5.call(e4._engine.create[c4](e4, n4));
                });
              }
              return e4._engine.create[c4](e4, arguments);
            }
            e4.version = "2.3.0", e4.eve = t4;
            var r5, i5, n3 = /[, ]+/, a4 = { circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1 }, s3 = /\{(\d+)\}/g, o4 = "hasOwnProperty", l4 = { doc: document, win: window }, h2 = { was: Object.prototype[o4].call(l4.win, "Raphael"), is: l4.win.Raphael }, u4 = function() {
              this.ca = this.customAttributes = {};
            }, c4 = "apply", f3 = "concat", p3 = "ontouchstart" in window || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch, d3 = "", g3 = " ", x2 = String, v3 = "split", y2 = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[v3](g3), m3 = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" }, b3 = x2.prototype.toLowerCase, _3 = Math, w3 = _3.max, k3 = _3.min, B2 = _3.abs, C2 = _3.pow, S = _3.PI, T2 = "number", A2 = "array", M2 = Object.prototype.toString, E2 = (e4._ISURL = /^url\(['"]?(.+?)['"]?\)$/i, /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i), N2 = { NaN: 1, Infinity: 1, "-Infinity": 1 }, L2 = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/, P2 = _3.round, z3 = parseFloat, F3 = parseInt, R = x2.prototype.toUpperCase, j3 = e4._availableAttrs = { "arrow-end": "none", "arrow-start": "none", blur: 0, "clip-rect": "0 0 1e9 1e9", cursor: "default", cx: 0, cy: 0, fill: "#fff", "fill-opacity": 1, font: '10px "Arial"', "font-family": '"Arial"', "font-size": "10", "font-style": "normal", "font-weight": 400, gradient: 0, height: 0, href: "http://raphaeljs.com/", "letter-spacing": 0, opacity: 1, path: "M0,0", r: 0, rx: 0, ry: 0, src: "", stroke: "#000", "stroke-dasharray": "", "stroke-linecap": "butt", "stroke-linejoin": "butt", "stroke-miterlimit": 0, "stroke-opacity": 1, "stroke-width": 1, target: "_blank", "text-anchor": "middle", title: "Raphael", transform: "", width: 0, x: 0, y: 0, class: "" }, I2 = e4._availableAnimAttrs = { blur: T2, "clip-rect": "csv", cx: T2, cy: T2, fill: "colour", "fill-opacity": T2, "font-size": T2, height: T2, opacity: T2, path: "path", r: T2, rx: T2, ry: T2, stroke: "colour", "stroke-opacity": T2, "stroke-width": T2, transform: "transform", width: T2, x: T2, y: T2 }, D2 = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/, q2 = { hs: 1, rg: 1 }, O2 = /,?([achlmqrstvxz]),?/gi, V = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, W = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi, Y = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi, G = (e4._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, {}), H2 = function(t5, e5) {
              return z3(t5) - z3(e5);
            }, X = function(t5) {
              return t5;
            }, U = e4._rectPath = function(t5, e5, r6, i6, n4) {
              return n4 ? [["M", t5 + n4, e5], ["l", r6 - 2 * n4, 0], ["a", n4, n4, 0, 0, 1, n4, n4], ["l", 0, i6 - 2 * n4], ["a", n4, n4, 0, 0, 1, -n4, n4], ["l", 2 * n4 - r6, 0], ["a", n4, n4, 0, 0, 1, -n4, -n4], ["l", 0, 2 * n4 - i6], ["a", n4, n4, 0, 0, 1, n4, -n4], ["z"]] : [["M", t5, e5], ["l", r6, 0], ["l", 0, i6], ["l", -r6, 0], ["z"]];
            }, $2 = function(t5, e5, r6, i6) {
              return null == i6 && (i6 = r6), [["M", t5, e5], ["m", 0, -i6], ["a", r6, i6, 0, 1, 1, 0, 2 * i6], ["a", r6, i6, 0, 1, 1, 0, -2 * i6], ["z"]];
            }, Z = e4._getPath = { path: function(t5) {
              return t5.attr("path");
            }, circle: function(t5) {
              var e5 = t5.attrs;
              return $2(e5.cx, e5.cy, e5.r);
            }, ellipse: function(t5) {
              var e5 = t5.attrs;
              return $2(e5.cx, e5.cy, e5.rx, e5.ry);
            }, rect: function(t5) {
              var e5 = t5.attrs;
              return U(e5.x, e5.y, e5.width, e5.height, e5.r);
            }, image: function(t5) {
              var e5 = t5.attrs;
              return U(e5.x, e5.y, e5.width, e5.height);
            }, text: function(t5) {
              var e5 = t5._getBBox();
              return U(e5.x, e5.y, e5.width, e5.height);
            }, set: function(t5) {
              var e5 = t5._getBBox();
              return U(e5.x, e5.y, e5.width, e5.height);
            } }, Q = e4.mapPath = function(t5, e5) {
              if (!e5)
                return t5;
              var r6, i6, n4, a5, s4, o5, l5;
              for (n4 = 0, s4 = (t5 = Tt(t5)).length; n4 < s4; n4++)
                for (a5 = 1, o5 = (l5 = t5[n4]).length; a5 < o5; a5 += 2)
                  r6 = e5.x(l5[a5], l5[a5 + 1]), i6 = e5.y(l5[a5], l5[a5 + 1]), l5[a5] = r6, l5[a5 + 1] = i6;
              return t5;
            };
            if (e4._g = l4, e4.type = l4.win.SVGAngle || l4.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", "VML" == e4.type) {
              var J, K = l4.doc.createElement("div");
              if (K.innerHTML = '<v:shape adj="1"/>', (J = K.firstChild).style.behavior = "url(#default#VML)", !J || "object" != typeof J.adj)
                return e4.type = d3;
              K = null;
            }
            function tt(t5) {
              if ("function" == typeof t5 || Object(t5) !== t5)
                return t5;
              var e5 = new t5.constructor();
              for (var r6 in t5)
                t5[o4](r6) && (e5[r6] = tt(t5[r6]));
              return e5;
            }
            e4.svg = !(e4.vml = "VML" == e4.type), e4._Paper = u4, e4.fn = i5 = u4.prototype = e4.prototype, e4._id = 0, e4.is = function(t5, e5) {
              return "finite" == (e5 = b3.call(e5)) ? !N2[o4](+t5) : "array" == e5 ? t5 instanceof Array : "null" == e5 && null === t5 || e5 == typeof t5 && null !== t5 || "object" == e5 && t5 === Object(t5) || "array" == e5 && Array.isArray && Array.isArray(t5) || M2.call(t5).slice(8, -1).toLowerCase() == e5;
            }, e4.angle = function(t5, r6, i6, n4, a5, s4) {
              if (null == a5) {
                var o5 = t5 - i6, l5 = r6 - n4;
                return o5 || l5 ? (180 + 180 * _3.atan2(-l5, -o5) / S + 360) % 360 : 0;
              }
              return e4.angle(t5, r6, a5, s4) - e4.angle(i6, n4, a5, s4);
            }, e4.rad = function(t5) {
              return t5 % 360 * S / 180;
            }, e4.deg = function(t5) {
              return Math.round(180 * t5 / S % 360 * 1e3) / 1e3;
            }, e4.snapTo = function(t5, r6, i6) {
              if (i6 = e4.is(i6, "finite") ? i6 : 10, e4.is(t5, A2)) {
                for (var n4 = t5.length; n4--; )
                  if (B2(t5[n4] - r6) <= i6)
                    return t5[n4];
              } else {
                var a5 = r6 % (t5 = +t5);
                if (a5 < i6)
                  return r6 - a5;
                if (a5 > t5 - i6)
                  return r6 - a5 + t5;
              }
              return r6;
            };
            var et, rt;
            e4.createUUID = (et = /[xy]/g, rt = function(t5) {
              var e5 = 16 * _3.random() | 0;
              return ("x" == t5 ? e5 : 3 & e5 | 8).toString(16);
            }, function() {
              return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(et, rt).toUpperCase();
            });
            e4.setWindow = function(r6) {
              t4("raphael.setWindow", e4, l4.win, r6), l4.win = r6, l4.doc = l4.win.document, e4._engine.initWin && e4._engine.initWin(l4.win);
            };
            var it = function(t5) {
              if (e4.vml) {
                var r6, i6 = /^\s+|\s+$/g;
                try {
                  var n4 = new ActiveXObject("htmlfile");
                  n4.write("<body>"), n4.close(), r6 = n4.body;
                } catch (t6) {
                  r6 = createPopup().document.body;
                }
                var a5 = r6.createTextRange();
                it = ht(function(t6) {
                  try {
                    r6.style.color = x2(t6).replace(i6, d3);
                    var e5 = a5.queryCommandValue("ForeColor");
                    return "#" + ("000000" + (e5 = (255 & e5) << 16 | 65280 & e5 | (16711680 & e5) >>> 16).toString(16)).slice(-6);
                  } catch (t7) {
                    return "none";
                  }
                });
              } else {
                var s4 = l4.doc.createElement("i");
                s4.title = "Rapha\xEBl Colour Picker", s4.style.display = "none", l4.doc.body.appendChild(s4), it = ht(function(t6) {
                  return s4.style.color = t6, l4.doc.defaultView.getComputedStyle(s4, d3).getPropertyValue("color");
                });
              }
              return it(t5);
            }, nt = function() {
              return "hsb(" + [this.h, this.s, this.b] + ")";
            }, at = function() {
              return "hsl(" + [this.h, this.s, this.l] + ")";
            }, st = function() {
              return this.hex;
            }, ot = function(t5, r6, i6) {
              if (null == r6 && e4.is(t5, "object") && "r" in t5 && "g" in t5 && "b" in t5 && (i6 = t5.b, r6 = t5.g, t5 = t5.r), null == r6 && e4.is(t5, "string")) {
                var n4 = e4.getRGB(t5);
                t5 = n4.r, r6 = n4.g, i6 = n4.b;
              }
              return (t5 > 1 || r6 > 1 || i6 > 1) && (t5 /= 255, r6 /= 255, i6 /= 255), [t5, r6, i6];
            }, lt = function(t5, r6, i6, n4) {
              var a5 = { r: t5 *= 255, g: r6 *= 255, b: i6 *= 255, hex: e4.rgb(t5, r6, i6), toString: st };
              return e4.is(n4, "finite") && (a5.opacity = n4), a5;
            };
            function ht(t5, e5, r6) {
              return function i6() {
                var n4 = Array.prototype.slice.call(arguments, 0), a5 = n4.join("\u2400"), s4 = i6.cache = i6.cache || {}, l5 = i6.count = i6.count || [];
                return s4[o4](a5) ? (function(t6, e6) {
                  for (var r7 = 0, i7 = t6.length; r7 < i7; r7++)
                    if (t6[r7] === e6)
                      return t6.push(t6.splice(r7, 1)[0]);
                }(l5, a5), r6 ? r6(s4[a5]) : s4[a5]) : (l5.length >= 1e3 && delete s4[l5.shift()], l5.push(a5), s4[a5] = t5[c4](e5, n4), r6 ? r6(s4[a5]) : s4[a5]);
              };
            }
            e4.color = function(t5) {
              var r6;
              return e4.is(t5, "object") && "h" in t5 && "s" in t5 && "b" in t5 ? (r6 = e4.hsb2rgb(t5), t5.r = r6.r, t5.g = r6.g, t5.b = r6.b, t5.hex = r6.hex) : e4.is(t5, "object") && "h" in t5 && "s" in t5 && "l" in t5 ? (r6 = e4.hsl2rgb(t5), t5.r = r6.r, t5.g = r6.g, t5.b = r6.b, t5.hex = r6.hex) : (e4.is(t5, "string") && (t5 = e4.getRGB(t5)), e4.is(t5, "object") && "r" in t5 && "g" in t5 && "b" in t5 ? (r6 = e4.rgb2hsl(t5), t5.h = r6.h, t5.s = r6.s, t5.l = r6.l, r6 = e4.rgb2hsb(t5), t5.v = r6.b) : (t5 = { hex: "none" }).r = t5.g = t5.b = t5.h = t5.s = t5.v = t5.l = -1), t5.toString = st, t5;
            }, e4.hsb2rgb = function(t5, e5, r6, i6) {
              var n4, a5, s4, o5, l5;
              return this.is(t5, "object") && "h" in t5 && "s" in t5 && "b" in t5 && (r6 = t5.b, e5 = t5.s, i6 = t5.o, t5 = t5.h), o5 = (l5 = r6 * e5) * (1 - B2((t5 = (t5 *= 360) % 360 / 60) % 2 - 1)), n4 = a5 = s4 = r6 - l5, lt(n4 += [l5, o5, 0, 0, o5, l5][t5 = ~~t5], a5 += [o5, l5, l5, o5, 0, 0][t5], s4 += [0, 0, o5, l5, l5, o5][t5], i6);
            }, e4.hsl2rgb = function(t5, e5, r6, i6) {
              var n4, a5, s4, o5, l5;
              return this.is(t5, "object") && "h" in t5 && "s" in t5 && "l" in t5 && (r6 = t5.l, e5 = t5.s, t5 = t5.h), (t5 > 1 || e5 > 1 || r6 > 1) && (t5 /= 360, e5 /= 100, r6 /= 100), o5 = (l5 = 2 * e5 * (r6 < 0.5 ? r6 : 1 - r6)) * (1 - B2((t5 = (t5 *= 360) % 360 / 60) % 2 - 1)), n4 = a5 = s4 = r6 - l5 / 2, lt(n4 += [l5, o5, 0, 0, o5, l5][t5 = ~~t5], a5 += [o5, l5, l5, o5, 0, 0][t5], s4 += [0, 0, o5, l5, l5, o5][t5], i6);
            }, e4.rgb2hsb = function(t5, e5, r6) {
              var i6, n4;
              return t5 = (r6 = ot(t5, e5, r6))[0], e5 = r6[1], r6 = r6[2], { h: ((0 == (n4 = (i6 = w3(t5, e5, r6)) - k3(t5, e5, r6)) ? null : i6 == t5 ? (e5 - r6) / n4 : i6 == e5 ? (r6 - t5) / n4 + 2 : (t5 - e5) / n4 + 4) + 360) % 6 * 60 / 360, s: 0 == n4 ? 0 : n4 / i6, b: i6, toString: nt };
            }, e4.rgb2hsl = function(t5, e5, r6) {
              var i6, n4, a5, s4;
              return t5 = (r6 = ot(t5, e5, r6))[0], e5 = r6[1], r6 = r6[2], i6 = ((n4 = w3(t5, e5, r6)) + (a5 = k3(t5, e5, r6))) / 2, { h: ((0 == (s4 = n4 - a5) ? null : n4 == t5 ? (e5 - r6) / s4 : n4 == e5 ? (r6 - t5) / s4 + 2 : (t5 - e5) / s4 + 4) + 360) % 6 * 60 / 360, s: 0 == s4 ? 0 : i6 < 0.5 ? s4 / (2 * i6) : s4 / (2 - 2 * i6), l: i6, toString: at };
            }, e4._path2string = function() {
              return this.join(",").replace(O2, "$1");
            };
            e4._preload = function(t5, e5) {
              var r6 = l4.doc.createElement("img");
              r6.style.cssText = "position:absolute;left:-9999em;top:-9999em", r6.onload = function() {
                e5.call(this), this.onload = null, l4.doc.body.removeChild(this);
              }, r6.onerror = function() {
                l4.doc.body.removeChild(this);
              }, l4.doc.body.appendChild(r6), r6.src = t5;
            };
            function ut() {
              return this.hex;
            }
            function ct(t5, e5) {
              for (var r6 = [], i6 = 0, n4 = t5.length; n4 - 2 * !e5 > i6; i6 += 2) {
                var a5 = [{ x: +t5[i6 - 2], y: +t5[i6 - 1] }, { x: +t5[i6], y: +t5[i6 + 1] }, { x: +t5[i6 + 2], y: +t5[i6 + 3] }, { x: +t5[i6 + 4], y: +t5[i6 + 5] }];
                e5 ? i6 ? n4 - 4 == i6 ? a5[3] = { x: +t5[0], y: +t5[1] } : n4 - 2 == i6 && (a5[2] = { x: +t5[0], y: +t5[1] }, a5[3] = { x: +t5[2], y: +t5[3] }) : a5[0] = { x: +t5[n4 - 2], y: +t5[n4 - 1] } : n4 - 4 == i6 ? a5[3] = a5[2] : i6 || (a5[0] = { x: +t5[i6], y: +t5[i6 + 1] }), r6.push(["C", (-a5[0].x + 6 * a5[1].x + a5[2].x) / 6, (-a5[0].y + 6 * a5[1].y + a5[2].y) / 6, (a5[1].x + 6 * a5[2].x - a5[3].x) / 6, (a5[1].y + 6 * a5[2].y - a5[3].y) / 6, a5[2].x, a5[2].y]);
              }
              return r6;
            }
            e4.getRGB = ht(function(t5) {
              if (!t5 || (t5 = x2(t5)).indexOf("-") + 1)
                return { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: ut };
              if ("none" == t5)
                return { r: -1, g: -1, b: -1, hex: "none", toString: ut };
              !q2[o4](t5.toLowerCase().substring(0, 2)) && "#" != t5.charAt() && (t5 = it(t5));
              var r6, i6, n4, a5, s4, l5, h3 = t5.match(E2);
              return h3 ? (h3[2] && (n4 = F3(h3[2].substring(5), 16), i6 = F3(h3[2].substring(3, 5), 16), r6 = F3(h3[2].substring(1, 3), 16)), h3[3] && (n4 = F3((s4 = h3[3].charAt(3)) + s4, 16), i6 = F3((s4 = h3[3].charAt(2)) + s4, 16), r6 = F3((s4 = h3[3].charAt(1)) + s4, 16)), h3[4] && (l5 = h3[4][v3](D2), r6 = z3(l5[0]), "%" == l5[0].slice(-1) && (r6 *= 2.55), i6 = z3(l5[1]), "%" == l5[1].slice(-1) && (i6 *= 2.55), n4 = z3(l5[2]), "%" == l5[2].slice(-1) && (n4 *= 2.55), "rgba" == h3[1].toLowerCase().slice(0, 4) && (a5 = z3(l5[3])), l5[3] && "%" == l5[3].slice(-1) && (a5 /= 100)), h3[5] ? (l5 = h3[5][v3](D2), r6 = z3(l5[0]), "%" == l5[0].slice(-1) && (r6 *= 2.55), i6 = z3(l5[1]), "%" == l5[1].slice(-1) && (i6 *= 2.55), n4 = z3(l5[2]), "%" == l5[2].slice(-1) && (n4 *= 2.55), ("deg" == l5[0].slice(-3) || "\xB0" == l5[0].slice(-1)) && (r6 /= 360), "hsba" == h3[1].toLowerCase().slice(0, 4) && (a5 = z3(l5[3])), l5[3] && "%" == l5[3].slice(-1) && (a5 /= 100), e4.hsb2rgb(r6, i6, n4, a5)) : h3[6] ? (l5 = h3[6][v3](D2), r6 = z3(l5[0]), "%" == l5[0].slice(-1) && (r6 *= 2.55), i6 = z3(l5[1]), "%" == l5[1].slice(-1) && (i6 *= 2.55), n4 = z3(l5[2]), "%" == l5[2].slice(-1) && (n4 *= 2.55), ("deg" == l5[0].slice(-3) || "\xB0" == l5[0].slice(-1)) && (r6 /= 360), "hsla" == h3[1].toLowerCase().slice(0, 4) && (a5 = z3(l5[3])), l5[3] && "%" == l5[3].slice(-1) && (a5 /= 100), e4.hsl2rgb(r6, i6, n4, a5)) : ((h3 = { r: r6, g: i6, b: n4, toString: ut }).hex = "#" + (16777216 | n4 | i6 << 8 | r6 << 16).toString(16).slice(1), e4.is(a5, "finite") && (h3.opacity = a5), h3)) : { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: ut };
            }, e4), e4.hsb = ht(function(t5, r6, i6) {
              return e4.hsb2rgb(t5, r6, i6).hex;
            }), e4.hsl = ht(function(t5, r6, i6) {
              return e4.hsl2rgb(t5, r6, i6).hex;
            }), e4.rgb = ht(function(t5, e5, r6) {
              function i6(t6) {
                return t6 + 0.5 | 0;
              }
              return "#" + (16777216 | i6(r6) | i6(e5) << 8 | i6(t5) << 16).toString(16).slice(1);
            }), e4.getColor = function(t5) {
              var e5 = this.getColor.start = this.getColor.start || { h: 0, s: 1, b: t5 || 0.75 }, r6 = this.hsb2rgb(e5.h, e5.s, e5.b);
              return e5.h += 0.075, e5.h > 1 && (e5.h = 0, e5.s -= 0.2, e5.s <= 0 && (this.getColor.start = { h: 0, s: 1, b: e5.b })), r6.hex;
            }, e4.getColor.reset = function() {
              delete this.start;
            }, e4.parsePathString = function(t5) {
              if (!t5)
                return null;
              var r6 = ft(t5);
              if (r6.arr)
                return mt(r6.arr);
              var i6 = { a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0 }, n4 = [];
              return e4.is(t5, A2) && e4.is(t5[0], A2) && (n4 = mt(t5)), n4.length || x2(t5).replace(V, function(t6, e5, r7) {
                var a5 = [], s4 = e5.toLowerCase();
                if (r7.replace(Y, function(t7, e6) {
                  e6 && a5.push(+e6);
                }), "m" == s4 && a5.length > 2 && (n4.push([e5][f3](a5.splice(0, 2))), s4 = "l", e5 = "m" == e5 ? "l" : "L"), "r" == s4)
                  n4.push([e5][f3](a5));
                else
                  for (; a5.length >= i6[s4] && (n4.push([e5][f3](a5.splice(0, i6[s4]))), i6[s4]); )
                    ;
              }), n4.toString = e4._path2string, r6.arr = mt(n4), n4;
            }, e4.parseTransformString = ht(function(t5) {
              if (!t5)
                return null;
              var r6 = [];
              return e4.is(t5, A2) && e4.is(t5[0], A2) && (r6 = mt(t5)), r6.length || x2(t5).replace(W, function(t6, e5, i6) {
                var n4 = [];
                b3.call(e5);
                i6.replace(Y, function(t7, e6) {
                  e6 && n4.push(+e6);
                }), r6.push([e5][f3](n4));
              }), r6.toString = e4._path2string, r6;
            }, this, function(t5) {
              if (!t5)
                return t5;
              for (var e5 = [], r6 = 0; r6 < t5.length; r6++) {
                for (var i6 = [], n4 = 0; n4 < t5[r6].length; n4++)
                  i6.push(t5[r6][n4]);
                e5.push(i6);
              }
              return e5;
            });
            var ft = function(t5) {
              var e5 = ft.ps = ft.ps || {};
              return e5[t5] ? e5[t5].sleep = 100 : e5[t5] = { sleep: 100 }, setTimeout(function() {
                for (var r6 in e5)
                  e5[o4](r6) && r6 != t5 && (e5[r6].sleep--, !e5[r6].sleep && delete e5[r6]);
              }), e5[t5];
            };
            function pt(t5, e5, r6, i6, n4) {
              return t5 * (t5 * (-3 * e5 + 9 * r6 - 9 * i6 + 3 * n4) + 6 * e5 - 12 * r6 + 6 * i6) - 3 * e5 + 3 * r6;
            }
            function dt(t5, e5, r6, i6, n4, a5, s4, o5, l5) {
              null == l5 && (l5 = 1);
              for (var h3 = (l5 = l5 > 1 ? 1 : l5 < 0 ? 0 : l5) / 2, u5 = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816], c5 = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472], f4 = 0, p4 = 0; p4 < 12; p4++) {
                var d4 = h3 * u5[p4] + h3, g4 = pt(d4, t5, r6, n4, s4), x3 = pt(d4, e5, i6, a5, o5), v4 = g4 * g4 + x3 * x3;
                f4 += c5[p4] * _3.sqrt(v4);
              }
              return h3 * f4;
            }
            function gt(t5, e5, r6, i6, n4, a5, s4, o5) {
              if (!(w3(t5, r6) < k3(n4, s4) || k3(t5, r6) > w3(n4, s4) || w3(e5, i6) < k3(a5, o5) || k3(e5, i6) > w3(a5, o5))) {
                var l5 = (t5 - r6) * (a5 - o5) - (e5 - i6) * (n4 - s4);
                if (l5) {
                  var h3 = ((t5 * i6 - e5 * r6) * (n4 - s4) - (t5 - r6) * (n4 * o5 - a5 * s4)) / l5, u5 = ((t5 * i6 - e5 * r6) * (a5 - o5) - (e5 - i6) * (n4 * o5 - a5 * s4)) / l5, c5 = +h3.toFixed(2), f4 = +u5.toFixed(2);
                  if (!(c5 < +k3(t5, r6).toFixed(2) || c5 > +w3(t5, r6).toFixed(2) || c5 < +k3(n4, s4).toFixed(2) || c5 > +w3(n4, s4).toFixed(2) || f4 < +k3(e5, i6).toFixed(2) || f4 > +w3(e5, i6).toFixed(2) || f4 < +k3(a5, o5).toFixed(2) || f4 > +w3(a5, o5).toFixed(2)))
                    return { x: h3, y: u5 };
                }
              }
            }
            function xt(t5, r6, i6) {
              var n4 = e4.bezierBBox(t5), a5 = e4.bezierBBox(r6);
              if (!e4.isBBoxIntersect(n4, a5))
                return i6 ? 0 : [];
              for (var s4 = dt.apply(0, t5), o5 = dt.apply(0, r6), l5 = w3(~~(s4 / 5), 1), h3 = w3(~~(o5 / 5), 1), u5 = [], c5 = [], f4 = {}, p4 = i6 ? 0 : [], d4 = 0; d4 < l5 + 1; d4++) {
                var g4 = e4.findDotsAtSegment.apply(e4, t5.concat(d4 / l5));
                u5.push({ x: g4.x, y: g4.y, t: d4 / l5 });
              }
              for (d4 = 0; d4 < h3 + 1; d4++)
                g4 = e4.findDotsAtSegment.apply(e4, r6.concat(d4 / h3)), c5.push({ x: g4.x, y: g4.y, t: d4 / h3 });
              for (d4 = 0; d4 < l5; d4++)
                for (var x3 = 0; x3 < h3; x3++) {
                  var v4 = u5[d4], y3 = u5[d4 + 1], m4 = c5[x3], b4 = c5[x3 + 1], _4 = B2(y3.x - v4.x) < 1e-3 ? "y" : "x", C3 = B2(b4.x - m4.x) < 1e-3 ? "y" : "x", S2 = gt(v4.x, v4.y, y3.x, y3.y, m4.x, m4.y, b4.x, b4.y);
                  if (S2) {
                    if (f4[S2.x.toFixed(4)] == S2.y.toFixed(4))
                      continue;
                    f4[S2.x.toFixed(4)] = S2.y.toFixed(4);
                    var T3 = v4.t + B2((S2[_4] - v4[_4]) / (y3[_4] - v4[_4])) * (y3.t - v4.t), A3 = m4.t + B2((S2[C3] - m4[C3]) / (b4[C3] - m4[C3])) * (b4.t - m4.t);
                    T3 >= 0 && T3 <= 1.001 && A3 >= 0 && A3 <= 1.001 && (i6 ? p4++ : p4.push({ x: S2.x, y: S2.y, t1: k3(T3, 1), t2: k3(A3, 1) }));
                  }
                }
              return p4;
            }
            function vt(t5, r6, i6) {
              t5 = e4._path2curve(t5), r6 = e4._path2curve(r6);
              for (var n4, a5, s4, o5, l5, h3, u5, c5, f4, p4, d4 = i6 ? 0 : [], g4 = 0, x3 = t5.length; g4 < x3; g4++) {
                var v4 = t5[g4];
                if ("M" == v4[0])
                  n4 = l5 = v4[1], a5 = h3 = v4[2];
                else {
                  "C" == v4[0] ? (f4 = [n4, a5].concat(v4.slice(1)), n4 = f4[6], a5 = f4[7]) : (f4 = [n4, a5, n4, a5, l5, h3, l5, h3], n4 = l5, a5 = h3);
                  for (var y3 = 0, m4 = r6.length; y3 < m4; y3++) {
                    var b4 = r6[y3];
                    if ("M" == b4[0])
                      s4 = u5 = b4[1], o5 = c5 = b4[2];
                    else {
                      "C" == b4[0] ? (p4 = [s4, o5].concat(b4.slice(1)), s4 = p4[6], o5 = p4[7]) : (p4 = [s4, o5, s4, o5, u5, c5, u5, c5], s4 = u5, o5 = c5);
                      var _4 = xt(f4, p4, i6);
                      if (i6)
                        d4 += _4;
                      else {
                        for (var w4 = 0, k4 = _4.length; w4 < k4; w4++)
                          _4[w4].segment1 = g4, _4[w4].segment2 = y3, _4[w4].bez1 = f4, _4[w4].bez2 = p4;
                        d4 = d4.concat(_4);
                      }
                    }
                  }
                }
              }
              return d4;
            }
            e4.findDotsAtSegment = function(t5, e5, r6, i6, n4, a5, s4, o5, l5) {
              var h3 = 1 - l5, u5 = C2(h3, 3), c5 = C2(h3, 2), f4 = l5 * l5, p4 = f4 * l5, d4 = u5 * t5 + 3 * c5 * l5 * r6 + 3 * h3 * l5 * l5 * n4 + p4 * s4, g4 = u5 * e5 + 3 * c5 * l5 * i6 + 3 * h3 * l5 * l5 * a5 + p4 * o5, x3 = t5 + 2 * l5 * (r6 - t5) + f4 * (n4 - 2 * r6 + t5), v4 = e5 + 2 * l5 * (i6 - e5) + f4 * (a5 - 2 * i6 + e5), y3 = r6 + 2 * l5 * (n4 - r6) + f4 * (s4 - 2 * n4 + r6), m4 = i6 + 2 * l5 * (a5 - i6) + f4 * (o5 - 2 * a5 + i6), b4 = h3 * t5 + l5 * r6, w4 = h3 * e5 + l5 * i6, k4 = h3 * n4 + l5 * s4, B3 = h3 * a5 + l5 * o5, T3 = 90 - 180 * _3.atan2(x3 - y3, v4 - m4) / S;
              return (x3 > y3 || v4 < m4) && (T3 += 180), { x: d4, y: g4, m: { x: x3, y: v4 }, n: { x: y3, y: m4 }, start: { x: b4, y: w4 }, end: { x: k4, y: B3 }, alpha: T3 };
            }, e4.bezierBBox = function(t5, r6, i6, n4, a5, s4, o5, l5) {
              e4.is(t5, "array") || (t5 = [t5, r6, i6, n4, a5, s4, o5, l5]);
              var h3 = St.apply(null, t5);
              return { x: h3.min.x, y: h3.min.y, x2: h3.max.x, y2: h3.max.y, width: h3.max.x - h3.min.x, height: h3.max.y - h3.min.y };
            }, e4.isPointInsideBBox = function(t5, e5, r6) {
              return e5 >= t5.x && e5 <= t5.x2 && r6 >= t5.y && r6 <= t5.y2;
            }, e4.isBBoxIntersect = function(t5, r6) {
              var i6 = e4.isPointInsideBBox;
              return i6(r6, t5.x, t5.y) || i6(r6, t5.x2, t5.y) || i6(r6, t5.x, t5.y2) || i6(r6, t5.x2, t5.y2) || i6(t5, r6.x, r6.y) || i6(t5, r6.x2, r6.y) || i6(t5, r6.x, r6.y2) || i6(t5, r6.x2, r6.y2) || (t5.x < r6.x2 && t5.x > r6.x || r6.x < t5.x2 && r6.x > t5.x) && (t5.y < r6.y2 && t5.y > r6.y || r6.y < t5.y2 && r6.y > t5.y);
            }, e4.pathIntersection = function(t5, e5) {
              return vt(t5, e5);
            }, e4.pathIntersectionNumber = function(t5, e5) {
              return vt(t5, e5, 1);
            }, e4.isPointInsidePath = function(t5, r6, i6) {
              var n4 = e4.pathBBox(t5);
              return e4.isPointInsideBBox(n4, r6, i6) && vt(t5, [["M", r6, i6], ["H", n4.x2 + 10]], 1) % 2 == 1;
            }, e4._removedFactory = function(e5) {
              return function() {
                t4("raphael.log", null, "Rapha\xEBl: you are calling to method \u201C" + e5 + "\u201D of removed object", e5);
              };
            };
            var yt = e4.pathBBox = function(t5) {
              var e5 = ft(t5);
              if (e5.bbox)
                return tt(e5.bbox);
              if (!t5)
                return { x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0 };
              for (var r6, i6 = 0, n4 = 0, a5 = [], s4 = [], o5 = 0, l5 = (t5 = Tt(t5)).length; o5 < l5; o5++)
                if ("M" == (r6 = t5[o5])[0])
                  i6 = r6[1], n4 = r6[2], a5.push(i6), s4.push(n4);
                else {
                  var h3 = St(i6, n4, r6[1], r6[2], r6[3], r6[4], r6[5], r6[6]);
                  a5 = a5[f3](h3.min.x, h3.max.x), s4 = s4[f3](h3.min.y, h3.max.y), i6 = r6[5], n4 = r6[6];
                }
              var u5 = k3[c4](0, a5), p4 = k3[c4](0, s4), d4 = w3[c4](0, a5), g4 = w3[c4](0, s4), x3 = d4 - u5, v4 = g4 - p4, y3 = { x: u5, y: p4, x2: d4, y2: g4, width: x3, height: v4, cx: u5 + x3 / 2, cy: p4 + v4 / 2 };
              return e5.bbox = tt(y3), y3;
            }, mt = function(t5) {
              var r6 = tt(t5);
              return r6.toString = e4._path2string, r6;
            }, bt = e4._pathToRelative = function(t5) {
              var r6 = ft(t5);
              if (r6.rel)
                return mt(r6.rel);
              e4.is(t5, A2) && e4.is(t5 && t5[0], A2) || (t5 = e4.parsePathString(t5));
              var i6 = [], n4 = 0, a5 = 0, s4 = 0, o5 = 0, l5 = 0;
              "M" == t5[0][0] && (s4 = n4 = t5[0][1], o5 = a5 = t5[0][2], l5++, i6.push(["M", n4, a5]));
              for (var h3 = l5, u5 = t5.length; h3 < u5; h3++) {
                var c5 = i6[h3] = [], f4 = t5[h3];
                if (f4[0] != b3.call(f4[0]))
                  switch (c5[0] = b3.call(f4[0]), c5[0]) {
                    case "a":
                      c5[1] = f4[1], c5[2] = f4[2], c5[3] = f4[3], c5[4] = f4[4], c5[5] = f4[5], c5[6] = +(f4[6] - n4).toFixed(3), c5[7] = +(f4[7] - a5).toFixed(3);
                      break;
                    case "v":
                      c5[1] = +(f4[1] - a5).toFixed(3);
                      break;
                    case "m":
                      s4 = f4[1], o5 = f4[2];
                    default:
                      for (var p4 = 1, d4 = f4.length; p4 < d4; p4++)
                        c5[p4] = +(f4[p4] - (p4 % 2 ? n4 : a5)).toFixed(3);
                  }
                else {
                  c5 = i6[h3] = [], "m" == f4[0] && (s4 = f4[1] + n4, o5 = f4[2] + a5);
                  for (var g4 = 0, x3 = f4.length; g4 < x3; g4++)
                    i6[h3][g4] = f4[g4];
                }
                var v4 = i6[h3].length;
                switch (i6[h3][0]) {
                  case "z":
                    n4 = s4, a5 = o5;
                    break;
                  case "h":
                    n4 += +i6[h3][v4 - 1];
                    break;
                  case "v":
                    a5 += +i6[h3][v4 - 1];
                    break;
                  default:
                    n4 += +i6[h3][v4 - 2], a5 += +i6[h3][v4 - 1];
                }
              }
              return i6.toString = e4._path2string, r6.rel = mt(i6), i6;
            }, _t = e4._pathToAbsolute = function(t5) {
              var r6 = ft(t5);
              if (r6.abs)
                return mt(r6.abs);
              if (e4.is(t5, A2) && e4.is(t5 && t5[0], A2) || (t5 = e4.parsePathString(t5)), !t5 || !t5.length)
                return [["M", 0, 0]];
              var i6 = [], n4 = 0, a5 = 0, s4 = 0, o5 = 0, l5 = 0;
              "M" == t5[0][0] && (s4 = n4 = +t5[0][1], o5 = a5 = +t5[0][2], l5++, i6[0] = ["M", n4, a5]);
              for (var h3, u5, c5 = 3 == t5.length && "M" == t5[0][0] && "R" == t5[1][0].toUpperCase() && "Z" == t5[2][0].toUpperCase(), p4 = l5, d4 = t5.length; p4 < d4; p4++) {
                if (i6.push(h3 = []), (u5 = t5[p4])[0] != R.call(u5[0]))
                  switch (h3[0] = R.call(u5[0]), h3[0]) {
                    case "A":
                      h3[1] = u5[1], h3[2] = u5[2], h3[3] = u5[3], h3[4] = u5[4], h3[5] = u5[5], h3[6] = +(u5[6] + n4), h3[7] = +(u5[7] + a5);
                      break;
                    case "V":
                      h3[1] = +u5[1] + a5;
                      break;
                    case "H":
                      h3[1] = +u5[1] + n4;
                      break;
                    case "R":
                      for (var g4 = [n4, a5][f3](u5.slice(1)), x3 = 2, v4 = g4.length; x3 < v4; x3++)
                        g4[x3] = +g4[x3] + n4, g4[++x3] = +g4[x3] + a5;
                      i6.pop(), i6 = i6[f3](ct(g4, c5));
                      break;
                    case "M":
                      s4 = +u5[1] + n4, o5 = +u5[2] + a5;
                    default:
                      for (x3 = 1, v4 = u5.length; x3 < v4; x3++)
                        h3[x3] = +u5[x3] + (x3 % 2 ? n4 : a5);
                  }
                else if ("R" == u5[0])
                  g4 = [n4, a5][f3](u5.slice(1)), i6.pop(), i6 = i6[f3](ct(g4, c5)), h3 = ["R"][f3](u5.slice(-2));
                else
                  for (var y3 = 0, m4 = u5.length; y3 < m4; y3++)
                    h3[y3] = u5[y3];
                switch (h3[0]) {
                  case "Z":
                    n4 = s4, a5 = o5;
                    break;
                  case "H":
                    n4 = h3[1];
                    break;
                  case "V":
                    a5 = h3[1];
                    break;
                  case "M":
                    s4 = h3[h3.length - 2], o5 = h3[h3.length - 1];
                  default:
                    n4 = h3[h3.length - 2], a5 = h3[h3.length - 1];
                }
              }
              return i6.toString = e4._path2string, r6.abs = mt(i6), i6;
            }, wt = function(t5, e5, r6, i6) {
              return [t5, e5, r6, i6, r6, i6];
            }, kt = function(t5, e5, r6, i6, n4, a5) {
              return [1 / 3 * t5 + 2 / 3 * r6, 1 / 3 * e5 + 2 / 3 * i6, 1 / 3 * n4 + 2 / 3 * r6, 1 / 3 * a5 + 2 / 3 * i6, n4, a5];
            }, Bt = function(t5, e5, r6, i6, n4, a5, s4, o5, l5, h3) {
              var u5, c5 = 120 * S / 180, p4 = S / 180 * (+n4 || 0), d4 = [], g4 = ht(function(t6, e6, r7) {
                return { x: t6 * _3.cos(r7) - e6 * _3.sin(r7), y: t6 * _3.sin(r7) + e6 * _3.cos(r7) };
              });
              if (h3)
                A3 = h3[0], M3 = h3[1], C3 = h3[2], T3 = h3[3];
              else {
                t5 = (u5 = g4(t5, e5, -p4)).x, e5 = u5.y, o5 = (u5 = g4(o5, l5, -p4)).x, l5 = u5.y;
                _3.cos(S / 180 * n4), _3.sin(S / 180 * n4);
                var x3 = (t5 - o5) / 2, y3 = (e5 - l5) / 2, m4 = x3 * x3 / (r6 * r6) + y3 * y3 / (i6 * i6);
                m4 > 1 && (r6 *= m4 = _3.sqrt(m4), i6 *= m4);
                var b4 = r6 * r6, w4 = i6 * i6, k4 = (a5 == s4 ? -1 : 1) * _3.sqrt(B2((b4 * w4 - b4 * y3 * y3 - w4 * x3 * x3) / (b4 * y3 * y3 + w4 * x3 * x3))), C3 = k4 * r6 * y3 / i6 + (t5 + o5) / 2, T3 = k4 * -i6 * x3 / r6 + (e5 + l5) / 2, A3 = _3.asin(((e5 - T3) / i6).toFixed(9)), M3 = _3.asin(((l5 - T3) / i6).toFixed(9));
                (A3 = t5 < C3 ? S - A3 : A3) < 0 && (A3 = 2 * S + A3), (M3 = o5 < C3 ? S - M3 : M3) < 0 && (M3 = 2 * S + M3), s4 && A3 > M3 && (A3 -= 2 * S), !s4 && M3 > A3 && (M3 -= 2 * S);
              }
              var E3 = M3 - A3;
              if (B2(E3) > c5) {
                var N3 = M3, L3 = o5, P3 = l5;
                M3 = A3 + c5 * (s4 && M3 > A3 ? 1 : -1), o5 = C3 + r6 * _3.cos(M3), l5 = T3 + i6 * _3.sin(M3), d4 = Bt(o5, l5, r6, i6, n4, 0, s4, L3, P3, [M3, N3, C3, T3]);
              }
              E3 = M3 - A3;
              var z4 = _3.cos(A3), F4 = _3.sin(A3), R2 = _3.cos(M3), j4 = _3.sin(M3), I3 = _3.tan(E3 / 4), D3 = 4 / 3 * r6 * I3, q3 = 4 / 3 * i6 * I3, O3 = [t5, e5], V2 = [t5 + D3 * F4, e5 - q3 * z4], W2 = [o5 + D3 * j4, l5 - q3 * R2], Y2 = [o5, l5];
              if (V2[0] = 2 * O3[0] - V2[0], V2[1] = 2 * O3[1] - V2[1], h3)
                return [V2, W2, Y2][f3](d4);
              for (var G2 = [], H3 = 0, X2 = (d4 = [V2, W2, Y2][f3](d4).join()[v3](",")).length; H3 < X2; H3++)
                G2[H3] = H3 % 2 ? g4(d4[H3 - 1], d4[H3], p4).y : g4(d4[H3], d4[H3 + 1], p4).x;
              return G2;
            }, Ct = function(t5, e5, r6, i6, n4, a5, s4, o5, l5) {
              var h3 = 1 - l5;
              return { x: C2(h3, 3) * t5 + 3 * C2(h3, 2) * l5 * r6 + 3 * h3 * l5 * l5 * n4 + C2(l5, 3) * s4, y: C2(h3, 3) * e5 + 3 * C2(h3, 2) * l5 * i6 + 3 * h3 * l5 * l5 * a5 + C2(l5, 3) * o5 };
            }, St = ht(function(t5, e5, r6, i6, n4, a5, s4, o5) {
              var l5, h3 = n4 - 2 * r6 + t5 - (s4 - 2 * n4 + r6), u5 = 2 * (r6 - t5) - 2 * (n4 - r6), f4 = t5 - r6, p4 = (-u5 + _3.sqrt(u5 * u5 - 4 * h3 * f4)) / 2 / h3, d4 = (-u5 - _3.sqrt(u5 * u5 - 4 * h3 * f4)) / 2 / h3, g4 = [e5, o5], x3 = [t5, s4];
              return B2(p4) > "1e12" && (p4 = 0.5), B2(d4) > "1e12" && (d4 = 0.5), p4 > 0 && p4 < 1 && (l5 = Ct(t5, e5, r6, i6, n4, a5, s4, o5, p4), x3.push(l5.x), g4.push(l5.y)), d4 > 0 && d4 < 1 && (l5 = Ct(t5, e5, r6, i6, n4, a5, s4, o5, d4), x3.push(l5.x), g4.push(l5.y)), h3 = a5 - 2 * i6 + e5 - (o5 - 2 * a5 + i6), f4 = e5 - i6, p4 = (-(u5 = 2 * (i6 - e5) - 2 * (a5 - i6)) + _3.sqrt(u5 * u5 - 4 * h3 * f4)) / 2 / h3, d4 = (-u5 - _3.sqrt(u5 * u5 - 4 * h3 * f4)) / 2 / h3, B2(p4) > "1e12" && (p4 = 0.5), B2(d4) > "1e12" && (d4 = 0.5), p4 > 0 && p4 < 1 && (l5 = Ct(t5, e5, r6, i6, n4, a5, s4, o5, p4), x3.push(l5.x), g4.push(l5.y)), d4 > 0 && d4 < 1 && (l5 = Ct(t5, e5, r6, i6, n4, a5, s4, o5, d4), x3.push(l5.x), g4.push(l5.y)), { min: { x: k3[c4](0, x3), y: k3[c4](0, g4) }, max: { x: w3[c4](0, x3), y: w3[c4](0, g4) } };
            }), Tt = e4._path2curve = ht(function(t5, e5) {
              var r6 = !e5 && ft(t5);
              if (!e5 && r6.curve)
                return mt(r6.curve);
              for (var i6 = _t(t5), n4 = e5 && _t(e5), a5 = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null }, s4 = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null }, o5 = function(t6, e6, r7) {
                var i7, n5;
                if (!t6)
                  return ["C", e6.x, e6.y, e6.x, e6.y, e6.x, e6.y];
                switch (!(t6[0] in { T: 1, Q: 1 }) && (e6.qx = e6.qy = null), t6[0]) {
                  case "M":
                    e6.X = t6[1], e6.Y = t6[2];
                    break;
                  case "A":
                    t6 = ["C"][f3](Bt[c4](0, [e6.x, e6.y][f3](t6.slice(1))));
                    break;
                  case "S":
                    "C" == r7 || "S" == r7 ? (i7 = 2 * e6.x - e6.bx, n5 = 2 * e6.y - e6.by) : (i7 = e6.x, n5 = e6.y), t6 = ["C", i7, n5][f3](t6.slice(1));
                    break;
                  case "T":
                    "Q" == r7 || "T" == r7 ? (e6.qx = 2 * e6.x - e6.qx, e6.qy = 2 * e6.y - e6.qy) : (e6.qx = e6.x, e6.qy = e6.y), t6 = ["C"][f3](kt(e6.x, e6.y, e6.qx, e6.qy, t6[1], t6[2]));
                    break;
                  case "Q":
                    e6.qx = t6[1], e6.qy = t6[2], t6 = ["C"][f3](kt(e6.x, e6.y, t6[1], t6[2], t6[3], t6[4]));
                    break;
                  case "L":
                    t6 = ["C"][f3](wt(e6.x, e6.y, t6[1], t6[2]));
                    break;
                  case "H":
                    t6 = ["C"][f3](wt(e6.x, e6.y, t6[1], e6.y));
                    break;
                  case "V":
                    t6 = ["C"][f3](wt(e6.x, e6.y, e6.x, t6[1]));
                    break;
                  case "Z":
                    t6 = ["C"][f3](wt(e6.x, e6.y, e6.X, e6.Y));
                }
                return t6;
              }, l5 = function(t6, e6) {
                if (t6[e6].length > 7) {
                  t6[e6].shift();
                  for (var r7 = t6[e6]; r7.length; )
                    u5[e6] = "A", n4 && (p4[e6] = "A"), t6.splice(e6++, 0, ["C"][f3](r7.splice(0, 6)));
                  t6.splice(e6, 1), v4 = w3(i6.length, n4 && n4.length || 0);
                }
              }, h3 = function(t6, e6, r7, a6, s5) {
                t6 && e6 && "M" == t6[s5][0] && "M" != e6[s5][0] && (e6.splice(s5, 0, ["M", a6.x, a6.y]), r7.bx = 0, r7.by = 0, r7.x = t6[s5][1], r7.y = t6[s5][2], v4 = w3(i6.length, n4 && n4.length || 0));
              }, u5 = [], p4 = [], d4 = "", g4 = "", x3 = 0, v4 = w3(i6.length, n4 && n4.length || 0); x3 < v4; x3++) {
                i6[x3] && (d4 = i6[x3][0]), "C" != d4 && (u5[x3] = d4, x3 && (g4 = u5[x3 - 1])), i6[x3] = o5(i6[x3], a5, g4), "A" != u5[x3] && "C" == d4 && (u5[x3] = "C"), l5(i6, x3), n4 && (n4[x3] && (d4 = n4[x3][0]), "C" != d4 && (p4[x3] = d4, x3 && (g4 = p4[x3 - 1])), n4[x3] = o5(n4[x3], s4, g4), "A" != p4[x3] && "C" == d4 && (p4[x3] = "C"), l5(n4, x3)), h3(i6, n4, a5, s4, x3), h3(n4, i6, s4, a5, x3);
                var y3 = i6[x3], m4 = n4 && n4[x3], b4 = y3.length, _4 = n4 && m4.length;
                a5.x = y3[b4 - 2], a5.y = y3[b4 - 1], a5.bx = z3(y3[b4 - 4]) || a5.x, a5.by = z3(y3[b4 - 3]) || a5.y, s4.bx = n4 && (z3(m4[_4 - 4]) || s4.x), s4.by = n4 && (z3(m4[_4 - 3]) || s4.y), s4.x = n4 && m4[_4 - 2], s4.y = n4 && m4[_4 - 1];
              }
              return n4 || (r6.curve = mt(i6)), n4 ? [i6, n4] : i6;
            }, null, mt), At = (e4._parseDots = ht(function(t5) {
              for (var r6 = [], i6 = 0, n4 = t5.length; i6 < n4; i6++) {
                var a5 = {}, s4 = t5[i6].match(/^([^:]*):?([\d\.]*)/);
                if (a5.color = e4.getRGB(s4[1]), a5.color.error)
                  return null;
                a5.opacity = a5.color.opacity, a5.color = a5.color.hex, s4[2] && (a5.offset = s4[2] + "%"), r6.push(a5);
              }
              for (i6 = 1, n4 = r6.length - 1; i6 < n4; i6++)
                if (!r6[i6].offset) {
                  for (var o5 = z3(r6[i6 - 1].offset || 0), l5 = 0, h3 = i6 + 1; h3 < n4; h3++)
                    if (r6[h3].offset) {
                      l5 = r6[h3].offset;
                      break;
                    }
                  l5 || (l5 = 100, h3 = n4);
                  for (var u5 = ((l5 = z3(l5)) - o5) / (h3 - i6 + 1); i6 < h3; i6++)
                    o5 += u5, r6[i6].offset = o5 + "%";
                }
              return r6;
            }), e4._tear = function(t5, e5) {
              t5 == e5.top && (e5.top = t5.prev), t5 == e5.bottom && (e5.bottom = t5.next), t5.next && (t5.next.prev = t5.prev), t5.prev && (t5.prev.next = t5.next);
            }), Mt = (e4._tofront = function(t5, e5) {
              e5.top !== t5 && (At(t5, e5), t5.next = null, t5.prev = e5.top, e5.top.next = t5, e5.top = t5);
            }, e4._toback = function(t5, e5) {
              e5.bottom !== t5 && (At(t5, e5), t5.next = e5.bottom, t5.prev = null, e5.bottom.prev = t5, e5.bottom = t5);
            }, e4._insertafter = function(t5, e5, r6) {
              At(t5, r6), e5 == r6.top && (r6.top = t5), e5.next && (e5.next.prev = t5), t5.next = e5.next, t5.prev = e5, e5.next = t5;
            }, e4._insertbefore = function(t5, e5, r6) {
              At(t5, r6), e5 == r6.bottom && (r6.bottom = t5), e5.prev && (e5.prev.next = t5), t5.prev = e5.prev, e5.prev = t5, t5.next = e5;
            }, e4.toMatrix = function(t5, e5) {
              var r6 = yt(t5), i6 = { _: { transform: d3 }, getBBox: function() {
                return r6;
              } };
              return Et(i6, e5), i6.matrix;
            }), Et = (e4.transformPath = function(t5, e5) {
              return Q(t5, Mt(t5, e5));
            }, e4._extractTransform = function(t5, r6) {
              if (null == r6)
                return t5._.transform;
              r6 = x2(r6).replace(/\.{3}|\u2026/g, t5._.transform || d3);
              var i6, n4, a5 = e4.parseTransformString(r6), s4 = 0, o5 = 1, l5 = 1, h3 = t5._, u5 = new Pt();
              if (h3.transform = a5 || [], a5)
                for (var c5 = 0, f4 = a5.length; c5 < f4; c5++) {
                  var p4, g4, v4, y3, m4, b4 = a5[c5], _4 = b4.length, w4 = x2(b4[0]).toLowerCase(), k4 = b4[0] != w4, B3 = k4 ? u5.invert() : 0;
                  "t" == w4 && 3 == _4 ? k4 ? (p4 = B3.x(0, 0), g4 = B3.y(0, 0), v4 = B3.x(b4[1], b4[2]), y3 = B3.y(b4[1], b4[2]), u5.translate(v4 - p4, y3 - g4)) : u5.translate(b4[1], b4[2]) : "r" == w4 ? 2 == _4 ? (m4 = m4 || t5.getBBox(1), u5.rotate(b4[1], m4.x + m4.width / 2, m4.y + m4.height / 2), s4 += b4[1]) : 4 == _4 && (k4 ? (v4 = B3.x(b4[2], b4[3]), y3 = B3.y(b4[2], b4[3]), u5.rotate(b4[1], v4, y3)) : u5.rotate(b4[1], b4[2], b4[3]), s4 += b4[1]) : "s" == w4 ? 2 == _4 || 3 == _4 ? (m4 = m4 || t5.getBBox(1), u5.scale(b4[1], b4[_4 - 1], m4.x + m4.width / 2, m4.y + m4.height / 2), o5 *= b4[1], l5 *= b4[_4 - 1]) : 5 == _4 && (k4 ? (v4 = B3.x(b4[3], b4[4]), y3 = B3.y(b4[3], b4[4]), u5.scale(b4[1], b4[2], v4, y3)) : u5.scale(b4[1], b4[2], b4[3], b4[4]), o5 *= b4[1], l5 *= b4[2]) : "m" == w4 && 7 == _4 && u5.add(b4[1], b4[2], b4[3], b4[4], b4[5], b4[6]), h3.dirtyT = 1, t5.matrix = u5;
                }
              t5.matrix = u5, h3.sx = o5, h3.sy = l5, h3.deg = s4, h3.dx = i6 = u5.e, h3.dy = n4 = u5.f, 1 == o5 && 1 == l5 && !s4 && h3.bbox ? (h3.bbox.x += +i6, h3.bbox.y += +n4) : h3.dirtyT = 1;
            }), Nt = function(t5) {
              var e5 = t5[0];
              switch (e5.toLowerCase()) {
                case "t":
                  return [e5, 0, 0];
                case "m":
                  return [e5, 1, 0, 0, 1, 0, 0];
                case "r":
                  return 4 == t5.length ? [e5, 0, t5[2], t5[3]] : [e5, 0];
                case "s":
                  return 5 == t5.length ? [e5, 1, 1, t5[3], t5[4]] : 3 == t5.length ? [e5, 1, 1] : [e5, 1];
              }
            }, Lt = e4._equaliseTransform = function(t5, r6) {
              r6 = x2(r6).replace(/\.{3}|\u2026/g, t5), t5 = e4.parseTransformString(t5) || [], r6 = e4.parseTransformString(r6) || [];
              for (var i6, n4, a5, s4, o5 = w3(t5.length, r6.length), l5 = [], h3 = [], u5 = 0; u5 < o5; u5++) {
                if (a5 = t5[u5] || Nt(r6[u5]), s4 = r6[u5] || Nt(a5), a5[0] != s4[0] || "r" == a5[0].toLowerCase() && (a5[2] != s4[2] || a5[3] != s4[3]) || "s" == a5[0].toLowerCase() && (a5[3] != s4[3] || a5[4] != s4[4]))
                  return;
                for (l5[u5] = [], h3[u5] = [], i6 = 0, n4 = w3(a5.length, s4.length); i6 < n4; i6++)
                  i6 in a5 && (l5[u5][i6] = a5[i6]), i6 in s4 && (h3[u5][i6] = s4[i6]);
              }
              return { from: l5, to: h3 };
            };
            function Pt(t5, e5, r6, i6, n4, a5) {
              null != t5 ? (this.a = +t5, this.b = +e5, this.c = +r6, this.d = +i6, this.e = +n4, this.f = +a5) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0);
            }
            e4._getContainer = function(t5, r6, i6, n4) {
              var a5;
              if (null != (a5 = null != n4 || e4.is(t5, "object") ? t5 : l4.doc.getElementById(t5)))
                return a5.tagName ? null == r6 ? { container: a5, width: a5.style.pixelWidth || a5.offsetWidth, height: a5.style.pixelHeight || a5.offsetHeight } : { container: a5, width: r6, height: i6 } : { container: 1, x: t5, y: r6, width: i6, height: n4 };
            }, e4.pathToRelative = bt, e4._engine = {}, e4.path2curve = Tt, e4.matrix = function(t5, e5, r6, i6, n4, a5) {
              return new Pt(t5, e5, r6, i6, n4, a5);
            }, function(t5) {
              function r6(t6) {
                return t6[0] * t6[0] + t6[1] * t6[1];
              }
              function i6(t6) {
                var e5 = _3.sqrt(r6(t6));
                t6[0] && (t6[0] /= e5), t6[1] && (t6[1] /= e5);
              }
              t5.add = function(t6, e5, r7, i7, n4, a5) {
                var s4, o5, l5, h3, u5 = [[], [], []], c5 = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]], f4 = [[t6, r7, n4], [e5, i7, a5], [0, 0, 1]];
                for (t6 && t6 instanceof Pt && (f4 = [[t6.a, t6.c, t6.e], [t6.b, t6.d, t6.f], [0, 0, 1]]), s4 = 0; s4 < 3; s4++)
                  for (o5 = 0; o5 < 3; o5++) {
                    for (h3 = 0, l5 = 0; l5 < 3; l5++)
                      h3 += c5[s4][l5] * f4[l5][o5];
                    u5[s4][o5] = h3;
                  }
                this.a = u5[0][0], this.b = u5[1][0], this.c = u5[0][1], this.d = u5[1][1], this.e = u5[0][2], this.f = u5[1][2];
              }, t5.invert = function() {
                var t6 = this, e5 = t6.a * t6.d - t6.b * t6.c;
                return new Pt(t6.d / e5, -t6.b / e5, -t6.c / e5, t6.a / e5, (t6.c * t6.f - t6.d * t6.e) / e5, (t6.b * t6.e - t6.a * t6.f) / e5);
              }, t5.clone = function() {
                return new Pt(this.a, this.b, this.c, this.d, this.e, this.f);
              }, t5.translate = function(t6, e5) {
                this.add(1, 0, 0, 1, t6, e5);
              }, t5.scale = function(t6, e5, r7, i7) {
                null == e5 && (e5 = t6), (r7 || i7) && this.add(1, 0, 0, 1, r7, i7), this.add(t6, 0, 0, e5, 0, 0), (r7 || i7) && this.add(1, 0, 0, 1, -r7, -i7);
              }, t5.rotate = function(t6, r7, i7) {
                t6 = e4.rad(t6), r7 = r7 || 0, i7 = i7 || 0;
                var n4 = +_3.cos(t6).toFixed(9), a5 = +_3.sin(t6).toFixed(9);
                this.add(n4, a5, -a5, n4, r7, i7), this.add(1, 0, 0, 1, -r7, -i7);
              }, t5.x = function(t6, e5) {
                return t6 * this.a + e5 * this.c + this.e;
              }, t5.y = function(t6, e5) {
                return t6 * this.b + e5 * this.d + this.f;
              }, t5.get = function(t6) {
                return +this[x2.fromCharCode(97 + t6)].toFixed(4);
              }, t5.toString = function() {
                return e4.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
              }, t5.toFilter = function() {
                return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
              }, t5.offset = function() {
                return [this.e.toFixed(4), this.f.toFixed(4)];
              }, t5.split = function() {
                var t6 = {};
                t6.dx = this.e, t6.dy = this.f;
                var n4 = [[this.a, this.c], [this.b, this.d]];
                t6.scalex = _3.sqrt(r6(n4[0])), i6(n4[0]), t6.shear = n4[0][0] * n4[1][0] + n4[0][1] * n4[1][1], n4[1] = [n4[1][0] - n4[0][0] * t6.shear, n4[1][1] - n4[0][1] * t6.shear], t6.scaley = _3.sqrt(r6(n4[1])), i6(n4[1]), t6.shear /= t6.scaley;
                var a5 = -n4[0][1], s4 = n4[1][1];
                return s4 < 0 ? (t6.rotate = e4.deg(_3.acos(s4)), a5 < 0 && (t6.rotate = 360 - t6.rotate)) : t6.rotate = e4.deg(_3.asin(a5)), t6.isSimple = !(+t6.shear.toFixed(9) || t6.scalex.toFixed(9) != t6.scaley.toFixed(9) && t6.rotate), t6.isSuperSimple = !+t6.shear.toFixed(9) && t6.scalex.toFixed(9) == t6.scaley.toFixed(9) && !t6.rotate, t6.noRotation = !+t6.shear.toFixed(9) && !t6.rotate, t6;
              }, t5.toTransformString = function(t6) {
                var e5 = t6 || this[v3]();
                return e5.isSimple ? (e5.scalex = +e5.scalex.toFixed(4), e5.scaley = +e5.scaley.toFixed(4), e5.rotate = +e5.rotate.toFixed(4), (e5.dx || e5.dy ? "t" + [e5.dx, e5.dy] : d3) + (1 != e5.scalex || 1 != e5.scaley ? "s" + [e5.scalex, e5.scaley, 0, 0] : d3) + (e5.rotate ? "r" + [e5.rotate, 0, 0] : d3)) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
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
            }, It = function(t5) {
              var e5 = l4.doc.documentElement.scrollTop || l4.doc.body.scrollTop, r6 = l4.doc.documentElement.scrollLeft || l4.doc.body.scrollLeft;
              return { x: t5.clientX + r6, y: t5.clientY + e5 };
            }, Dt = l4.doc.addEventListener ? function(t5, e5, r6, i6) {
              var n4 = function(t6) {
                var e6 = It(t6);
                return r6.call(i6, t6, e6.x, e6.y);
              };
              if (t5.addEventListener(e5, n4, false), p3 && m3[e5]) {
                var a5 = function(e6) {
                  for (var n5 = It(e6), a6 = e6, s4 = 0, o5 = e6.targetTouches && e6.targetTouches.length; s4 < o5; s4++)
                    if (e6.targetTouches[s4].target == t5) {
                      (e6 = e6.targetTouches[s4]).originalEvent = a6, e6.preventDefault = Ft, e6.stopPropagation = jt;
                      break;
                    }
                  return r6.call(i6, e6, n5.x, n5.y);
                };
                t5.addEventListener(m3[e5], a5, false);
              }
              return function() {
                return t5.removeEventListener(e5, n4, false), p3 && m3[e5] && t5.removeEventListener(m3[e5], a5, false), true;
              };
            } : l4.doc.attachEvent ? function(t5, e5, r6, i6) {
              var n4 = function(t6) {
                t6 = t6 || l4.win.event;
                var e6 = l4.doc.documentElement.scrollTop || l4.doc.body.scrollTop, n5 = l4.doc.documentElement.scrollLeft || l4.doc.body.scrollLeft, a5 = t6.clientX + n5, s4 = t6.clientY + e6;
                return t6.preventDefault = t6.preventDefault || zt, t6.stopPropagation = t6.stopPropagation || Rt, r6.call(i6, t6, a5, s4);
              };
              return t5.attachEvent("on" + e5, n4), function() {
                return t5.detachEvent("on" + e5, n4), true;
              };
            } : void 0, qt = [], Ot = function(e5) {
              for (var r6, i6 = e5.clientX, n4 = e5.clientY, a5 = l4.doc.documentElement.scrollTop || l4.doc.body.scrollTop, s4 = l4.doc.documentElement.scrollLeft || l4.doc.body.scrollLeft, o5 = qt.length; o5--; ) {
                if (r6 = qt[o5], p3 && e5.touches) {
                  for (var h3, u5 = e5.touches.length; u5--; )
                    if ((h3 = e5.touches[u5]).identifier == r6.el._drag.id) {
                      i6 = h3.clientX, n4 = h3.clientY, (e5.originalEvent ? e5.originalEvent : e5).preventDefault();
                      break;
                    }
                } else
                  e5.preventDefault();
                var c5, f4 = r6.el.node, d4 = f4.nextSibling, g4 = f4.parentNode, x3 = f4.style.display;
                l4.win.opera && g4.removeChild(f4), f4.style.display = "none", c5 = r6.el.paper.getElementByPoint(i6, n4), f4.style.display = x3, l4.win.opera && (d4 ? g4.insertBefore(f4, d4) : g4.appendChild(f4)), c5 && t4("raphael.drag.over." + r6.el.id, r6.el, c5), i6 += s4, n4 += a5, t4("raphael.drag.move." + r6.el.id, r6.move_scope || r6.el, i6 - r6.el._drag.x, n4 - r6.el._drag.y, i6, n4, e5);
              }
            }, Vt = function(r6) {
              e4.unmousemove(Ot).unmouseup(Vt);
              for (var i6, n4 = qt.length; n4--; )
                (i6 = qt[n4]).el._drag = {}, t4("raphael.drag.end." + i6.el.id, i6.end_scope || i6.start_scope || i6.move_scope || i6.el, r6);
              qt = [];
            }, Wt = e4.el = {}, Yt = y2.length; Yt--; )
              !function(t5) {
                e4[t5] = Wt[t5] = function(r6, i6) {
                  return e4.is(r6, "function") && (this.events = this.events || [], this.events.push({ name: t5, f: r6, unbind: Dt(this.shape || this.node || l4.doc, t5, r6, i6 || this) })), this;
                }, e4["un" + t5] = Wt["un" + t5] = function(r6) {
                  for (var i6 = this.events || [], n4 = i6.length; n4--; )
                    i6[n4].name != t5 || !e4.is(r6, "undefined") && i6[n4].f != r6 || (i6[n4].unbind(), i6.splice(n4, 1), !i6.length && delete this.events);
                  return this;
                };
              }(y2[Yt]);
            Wt.data = function(r6, i6) {
              var n4 = G[this.id] = G[this.id] || {};
              if (0 == arguments.length)
                return n4;
              if (1 == arguments.length) {
                if (e4.is(r6, "object")) {
                  for (var a5 in r6)
                    r6[o4](a5) && this.data(a5, r6[a5]);
                  return this;
                }
                return t4("raphael.data.get." + this.id, this, n4[r6], r6), n4[r6];
              }
              return n4[r6] = i6, t4("raphael.data.set." + this.id, this, i6, r6), this;
            }, Wt.removeData = function(t5) {
              return null == t5 ? delete G[this.id] : G[this.id] && delete G[this.id][t5], this;
            }, Wt.getData = function() {
              return tt(G[this.id] || {});
            }, Wt.hover = function(t5, e5, r6, i6) {
              return this.mouseover(t5, r6).mouseout(e5, i6 || r6);
            }, Wt.unhover = function(t5, e5) {
              return this.unmouseover(t5).unmouseout(e5);
            };
            var Gt = [];
            Wt.drag = function(r6, i6, n4, a5, s4, o5) {
              function h3(h4) {
                (h4.originalEvent || h4).preventDefault();
                var u5 = h4.clientX, c5 = h4.clientY, f4 = l4.doc.documentElement.scrollTop || l4.doc.body.scrollTop, d4 = l4.doc.documentElement.scrollLeft || l4.doc.body.scrollLeft;
                if (this._drag.id = h4.identifier, p3 && h4.touches) {
                  for (var g4, x3 = h4.touches.length; x3--; )
                    if (g4 = h4.touches[x3], this._drag.id = g4.identifier, g4.identifier == this._drag.id) {
                      u5 = g4.clientX, c5 = g4.clientY;
                      break;
                    }
                }
                this._drag.x = u5 + d4, this._drag.y = c5 + f4, !qt.length && e4.mousemove(Ot).mouseup(Vt), qt.push({ el: this, move_scope: a5, start_scope: s4, end_scope: o5 }), i6 && t4.on("raphael.drag.start." + this.id, i6), r6 && t4.on("raphael.drag.move." + this.id, r6), n4 && t4.on("raphael.drag.end." + this.id, n4), t4("raphael.drag.start." + this.id, s4 || a5 || this, this._drag.x, this._drag.y, h4);
              }
              return this._drag = {}, Gt.push({ el: this, start: h3 }), this.mousedown(h3), this;
            }, Wt.onDragOver = function(e5) {
              e5 ? t4.on("raphael.drag.over." + this.id, e5) : t4.unbind("raphael.drag.over." + this.id);
            }, Wt.undrag = function() {
              for (var r6 = Gt.length; r6--; )
                Gt[r6].el == this && (this.unmousedown(Gt[r6].start), Gt.splice(r6, 1), t4.unbind("raphael.drag.*." + this.id));
              !Gt.length && e4.unmousemove(Ot).unmouseup(Vt), qt = [];
            }, i5.circle = function(t5, r6, i6) {
              var n4 = e4._engine.circle(this, t5 || 0, r6 || 0, i6 || 0);
              return this.__set__ && this.__set__.push(n4), n4;
            }, i5.rect = function(t5, r6, i6, n4, a5) {
              var s4 = e4._engine.rect(this, t5 || 0, r6 || 0, i6 || 0, n4 || 0, a5 || 0);
              return this.__set__ && this.__set__.push(s4), s4;
            }, i5.ellipse = function(t5, r6, i6, n4) {
              var a5 = e4._engine.ellipse(this, t5 || 0, r6 || 0, i6 || 0, n4 || 0);
              return this.__set__ && this.__set__.push(a5), a5;
            }, i5.path = function(t5) {
              t5 && !e4.is(t5, "string") && !e4.is(t5[0], A2) && (t5 += d3);
              var r6 = e4._engine.path(e4.format[c4](e4, arguments), this);
              return this.__set__ && this.__set__.push(r6), r6;
            }, i5.image = function(t5, r6, i6, n4, a5) {
              var s4 = e4._engine.image(this, t5 || "about:blank", r6 || 0, i6 || 0, n4 || 0, a5 || 0);
              return this.__set__ && this.__set__.push(s4), s4;
            }, i5.text = function(t5, r6, i6) {
              var n4 = e4._engine.text(this, t5 || 0, r6 || 0, x2(i6));
              return this.__set__ && this.__set__.push(n4), n4;
            }, i5.set = function(t5) {
              !e4.is(t5, "array") && (t5 = Array.prototype.splice.call(arguments, 0, arguments.length));
              var r6 = new ce(t5);
              return this.__set__ && this.__set__.push(r6), r6.paper = this, r6.type = "set", r6;
            }, i5.setStart = function(t5) {
              this.__set__ = t5 || this.set();
            }, i5.setFinish = function(t5) {
              var e5 = this.__set__;
              return delete this.__set__, e5;
            }, i5.getSize = function() {
              var t5 = this.canvas.parentNode;
              return { width: t5.offsetWidth, height: t5.offsetHeight };
            }, i5.setSize = function(t5, r6) {
              return e4._engine.setSize.call(this, t5, r6);
            }, i5.setViewBox = function(t5, r6, i6, n4, a5) {
              return e4._engine.setViewBox.call(this, t5, r6, i6, n4, a5);
            }, i5.top = i5.bottom = null, i5.raphael = e4;
            function Ht() {
              return this.x + g3 + this.y + g3 + this.width + " \xD7 " + this.height;
            }
            i5.getElementByPoint = function(t5, e5) {
              var r6, i6, n4, a5, s4, o5, h3, u5 = this.canvas, c5 = l4.doc.elementFromPoint(t5, e5);
              if (l4.win.opera && "svg" == c5.tagName) {
                var f4 = (i6 = (r6 = u5).getBoundingClientRect(), n4 = r6.ownerDocument, a5 = n4.body, s4 = n4.documentElement, o5 = s4.clientTop || a5.clientTop || 0, h3 = s4.clientLeft || a5.clientLeft || 0, { y: i6.top + (l4.win.pageYOffset || s4.scrollTop || a5.scrollTop) - o5, x: i6.left + (l4.win.pageXOffset || s4.scrollLeft || a5.scrollLeft) - h3 }), p4 = u5.createSVGRect();
                p4.x = t5 - f4.x, p4.y = e5 - f4.y, p4.width = p4.height = 1;
                var d4 = u5.getIntersectionList(p4, null);
                d4.length && (c5 = d4[d4.length - 1]);
              }
              if (!c5)
                return null;
              for (; c5.parentNode && c5 != u5.parentNode && !c5.raphael; )
                c5 = c5.parentNode;
              return c5 == this.canvas.parentNode && (c5 = u5), c5 = c5 && c5.raphael ? this.getById(c5.raphaelid) : null;
            }, i5.getElementsByBBox = function(t5) {
              var r6 = this.set();
              return this.forEach(function(i6) {
                e4.isBBoxIntersect(i6.getBBox(), t5) && r6.push(i6);
              }), r6;
            }, i5.getById = function(t5) {
              for (var e5 = this.bottom; e5; ) {
                if (e5.id == t5)
                  return e5;
                e5 = e5.next;
              }
              return null;
            }, i5.forEach = function(t5, e5) {
              for (var r6 = this.bottom; r6; ) {
                if (false === t5.call(e5, r6))
                  return this;
                r6 = r6.next;
              }
              return this;
            }, i5.getElementsByPoint = function(t5, e5) {
              var r6 = this.set();
              return this.forEach(function(i6) {
                i6.isPointInside(t5, e5) && r6.push(i6);
              }), r6;
            }, Wt.isPointInside = function(t5, r6) {
              var i6 = this.realPath = Z[this.type](this);
              return this.attr("transform") && this.attr("transform").length && (i6 = e4.transformPath(i6, this.attr("transform"))), e4.isPointInsidePath(i6, t5, r6);
            }, Wt.getBBox = function(t5) {
              if (this.removed)
                return {};
              var e5 = this._;
              return t5 ? (!e5.dirty && e5.bboxwt || (this.realPath = Z[this.type](this), e5.bboxwt = yt(this.realPath), e5.bboxwt.toString = Ht, e5.dirty = 0), e5.bboxwt) : ((e5.dirty || e5.dirtyT || !e5.bbox) && (!e5.dirty && this.realPath || (e5.bboxwt = 0, this.realPath = Z[this.type](this)), e5.bbox = yt(Q(this.realPath, this.matrix)), e5.bbox.toString = Ht, e5.dirty = e5.dirtyT = 0), e5.bbox);
            }, Wt.clone = function() {
              if (this.removed)
                return null;
              var t5 = this.paper[this.type]().attr(this.attr());
              return this.__set__ && this.__set__.push(t5), t5;
            }, Wt.glow = function(t5) {
              if ("text" == this.type)
                return null;
              var e5 = { width: ((t5 = t5 || {}).width || 10) + (+this.attr("stroke-width") || 1), fill: t5.fill || false, opacity: null == t5.opacity ? 0.5 : t5.opacity, offsetx: t5.offsetx || 0, offsety: t5.offsety || 0, color: t5.color || "#000" }, r6 = e5.width / 2, i6 = this.paper, n4 = i6.set(), a5 = this.realPath || Z[this.type](this);
              a5 = this.matrix ? Q(a5, this.matrix) : a5;
              for (var s4 = 1; s4 < r6 + 1; s4++)
                n4.push(i6.path(a5).attr({ stroke: e5.color, fill: e5.fill ? e5.color : "none", "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-width": +(e5.width / r6 * s4).toFixed(3), opacity: +(e5.opacity / r6).toFixed(3) }));
              return n4.insertBefore(this).translate(e5.offsetx, e5.offsety);
            };
            var Xt = function(t5, r6, i6, n4, a5, s4, o5, l5, h3) {
              return null == h3 ? dt(t5, r6, i6, n4, a5, s4, o5, l5) : e4.findDotsAtSegment(t5, r6, i6, n4, a5, s4, o5, l5, function(t6, e5, r7, i7, n5, a6, s5, o6, l6) {
                if (!(l6 < 0 || dt(t6, e5, r7, i7, n5, a6, s5, o6) < l6)) {
                  var h4, u5 = 0.5, c5 = 1 - u5;
                  for (h4 = dt(t6, e5, r7, i7, n5, a6, s5, o6, c5); B2(h4 - l6) > 0.01; )
                    h4 = dt(t6, e5, r7, i7, n5, a6, s5, o6, c5 += (h4 < l6 ? 1 : -1) * (u5 /= 2));
                  return c5;
                }
              }(t5, r6, i6, n4, a5, s4, o5, l5, h3));
            }, Ut = function(t5, r6) {
              return function(i6, n4, a5) {
                for (var s4, o5, l5, h3, u5, c5 = "", f4 = {}, p4 = 0, d4 = 0, g4 = (i6 = Tt(i6)).length; d4 < g4; d4++) {
                  if ("M" == (l5 = i6[d4])[0])
                    s4 = +l5[1], o5 = +l5[2];
                  else {
                    if (p4 + (h3 = Xt(s4, o5, l5[1], l5[2], l5[3], l5[4], l5[5], l5[6])) > n4) {
                      if (r6 && !f4.start) {
                        if (c5 += ["C" + (u5 = Xt(s4, o5, l5[1], l5[2], l5[3], l5[4], l5[5], l5[6], n4 - p4)).start.x, u5.start.y, u5.m.x, u5.m.y, u5.x, u5.y], a5)
                          return c5;
                        f4.start = c5, c5 = ["M" + u5.x, u5.y + "C" + u5.n.x, u5.n.y, u5.end.x, u5.end.y, l5[5], l5[6]].join(), p4 += h3, s4 = +l5[5], o5 = +l5[6];
                        continue;
                      }
                      if (!t5 && !r6)
                        return { x: (u5 = Xt(s4, o5, l5[1], l5[2], l5[3], l5[4], l5[5], l5[6], n4 - p4)).x, y: u5.y, alpha: u5.alpha };
                    }
                    p4 += h3, s4 = +l5[5], o5 = +l5[6];
                  }
                  c5 += l5.shift() + l5;
                }
                return f4.end = c5, (u5 = t5 ? p4 : r6 ? f4 : e4.findDotsAtSegment(s4, o5, l5[0], l5[1], l5[2], l5[3], l5[4], l5[5], 1)).alpha && (u5 = { x: u5.x, y: u5.y, alpha: u5.alpha }), u5;
              };
            }, $t = Ut(1), Zt = Ut(), Qt = Ut(0, 1);
            e4.getTotalLength = $t, e4.getPointAtLength = Zt, e4.getSubpath = function(t5, e5, r6) {
              if (this.getTotalLength(t5) - r6 < 1e-6)
                return Qt(t5, e5).end;
              var i6 = Qt(t5, r6, 1);
              return e5 ? Qt(i6, e5).end : i6;
            }, Wt.getTotalLength = function() {
              var t5 = this.getPath();
              if (t5)
                return this.node.getTotalLength ? this.node.getTotalLength() : $t(t5);
            }, Wt.getPointAtLength = function(t5) {
              var e5 = this.getPath();
              if (e5)
                return Zt(e5, t5);
            }, Wt.getPath = function() {
              var t5, r6 = e4._getPath[this.type];
              if ("text" != this.type && "set" != this.type)
                return r6 && (t5 = r6(this)), t5;
            }, Wt.getSubpath = function(t5, r6) {
              var i6 = this.getPath();
              if (i6)
                return e4.getSubpath(i6, t5, r6);
            };
            var Jt = e4.easing_formulas = { linear: function(t5) {
              return t5;
            }, "<": function(t5) {
              return C2(t5, 1.7);
            }, ">": function(t5) {
              return C2(t5, 0.48);
            }, "<>": function(t5) {
              var e5 = 0.48 - t5 / 1.04, r6 = _3.sqrt(0.1734 + e5 * e5), i6 = r6 - e5, n4 = -r6 - e5, a5 = C2(B2(i6), 1 / 3) * (i6 < 0 ? -1 : 1) + C2(B2(n4), 1 / 3) * (n4 < 0 ? -1 : 1) + 0.5;
              return 3 * (1 - a5) * a5 * a5 + a5 * a5 * a5;
            }, backIn: function(t5) {
              var e5 = 1.70158;
              return t5 * t5 * ((e5 + 1) * t5 - e5);
            }, backOut: function(t5) {
              var e5 = 1.70158;
              return (t5 -= 1) * t5 * ((e5 + 1) * t5 + e5) + 1;
            }, elastic: function(t5) {
              return t5 == !!t5 ? t5 : C2(2, -10 * t5) * _3.sin(2 * S * (t5 - 0.075) / 0.3) + 1;
            }, bounce: function(t5) {
              var e5 = 7.5625, r6 = 2.75;
              return t5 < 1 / r6 ? e5 * t5 * t5 : t5 < 2 / r6 ? e5 * (t5 -= 1.5 / r6) * t5 + 0.75 : t5 < 2.5 / r6 ? e5 * (t5 -= 2.25 / r6) * t5 + 0.9375 : e5 * (t5 -= 2.625 / r6) * t5 + 0.984375;
            } };
            Jt.easeIn = Jt["ease-in"] = Jt["<"], Jt.easeOut = Jt["ease-out"] = Jt[">"], Jt.easeInOut = Jt["ease-in-out"] = Jt["<>"], Jt["back-in"] = Jt.backIn, Jt["back-out"] = Jt.backOut;
            var Kt = [], te = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t5) {
              setTimeout(t5, 16);
            }, ee = function() {
              for (var r6 = +/* @__PURE__ */ new Date(), i6 = 0; i6 < Kt.length; i6++) {
                var n4 = Kt[i6];
                if (!n4.el.removed && !n4.paused) {
                  var a5, s4, l5 = r6 - n4.start, h3 = n4.ms, u5 = n4.easing, c5 = n4.from, p4 = n4.diff, d4 = n4.to, x3 = (n4.t, n4.el), v4 = {}, y3 = {};
                  if (n4.initstatus ? (l5 = (n4.initstatus * n4.anim.top - n4.prev) / (n4.percent - n4.prev) * h3, n4.status = n4.initstatus, delete n4.initstatus, n4.stop && Kt.splice(i6--, 1)) : n4.status = (n4.prev + (n4.percent - n4.prev) * (l5 / h3)) / n4.anim.top, !(l5 < 0))
                    if (l5 < h3) {
                      var m4 = u5(l5 / h3);
                      for (var b4 in c5)
                        if (c5[o4](b4)) {
                          switch (I2[b4]) {
                            case T2:
                              a5 = +c5[b4] + m4 * h3 * p4[b4];
                              break;
                            case "colour":
                              a5 = "rgb(" + [re(P2(c5[b4].r + m4 * h3 * p4[b4].r)), re(P2(c5[b4].g + m4 * h3 * p4[b4].g)), re(P2(c5[b4].b + m4 * h3 * p4[b4].b))].join(",") + ")";
                              break;
                            case "path":
                              a5 = [];
                              for (var _4 = 0, w4 = c5[b4].length; _4 < w4; _4++) {
                                a5[_4] = [c5[b4][_4][0]];
                                for (var k4 = 1, B3 = c5[b4][_4].length; k4 < B3; k4++)
                                  a5[_4][k4] = +c5[b4][_4][k4] + m4 * h3 * p4[b4][_4][k4];
                                a5[_4] = a5[_4].join(g3);
                              }
                              a5 = a5.join(g3);
                              break;
                            case "transform":
                              if (p4[b4].real)
                                for (a5 = [], _4 = 0, w4 = c5[b4].length; _4 < w4; _4++)
                                  for (a5[_4] = [c5[b4][_4][0]], k4 = 1, B3 = c5[b4][_4].length; k4 < B3; k4++)
                                    a5[_4][k4] = c5[b4][_4][k4] + m4 * h3 * p4[b4][_4][k4];
                              else {
                                var C3 = function(t5) {
                                  return +c5[b4][t5] + m4 * h3 * p4[b4][t5];
                                };
                                a5 = [["m", C3(0), C3(1), C3(2), C3(3), C3(4), C3(5)]];
                              }
                              break;
                            case "csv":
                              if ("clip-rect" == b4)
                                for (a5 = [], _4 = 4; _4--; )
                                  a5[_4] = +c5[b4][_4] + m4 * h3 * p4[b4][_4];
                              break;
                            default:
                              var S2 = [][f3](c5[b4]);
                              for (a5 = [], _4 = x3.paper.customAttributes[b4].length; _4--; )
                                a5[_4] = +S2[_4] + m4 * h3 * p4[b4][_4];
                          }
                          v4[b4] = a5;
                        }
                      x3.attr(v4), function(e5, r7, i7) {
                        setTimeout(function() {
                          t4("raphael.anim.frame." + e5, r7, i7);
                        });
                      }(x3.id, x3, n4.anim);
                    } else {
                      if (function(r7, i7, n5) {
                        setTimeout(function() {
                          t4("raphael.anim.frame." + i7.id, i7, n5), t4("raphael.anim.finish." + i7.id, i7, n5), e4.is(r7, "function") && r7.call(i7);
                        });
                      }(n4.callback, x3, n4.anim), x3.attr(d4), Kt.splice(i6--, 1), n4.repeat > 1 && !n4.next) {
                        for (s4 in d4)
                          d4[o4](s4) && (y3[s4] = n4.totalOrigin[s4]);
                        n4.el.attr(y3), ae(n4.anim, n4.el, n4.anim.percents[0], null, n4.totalOrigin, n4.repeat - 1);
                      }
                      n4.next && !n4.stop && ae(n4.anim, n4.el, n4.next, null, n4.totalOrigin, n4.repeat);
                    }
                }
              }
              Kt.length && te(ee);
            }, re = function(t5) {
              return t5 > 255 ? 255 : t5 < 0 ? 0 : t5;
            };
            function ie(t5, e5, r6, i6, n4, a5) {
              var s4 = 3 * e5, o5 = 3 * (i6 - e5) - s4, l5 = 1 - s4 - o5, h3 = 3 * r6, u5 = 3 * (n4 - r6) - h3, c5 = 1 - h3 - u5;
              function f4(t6) {
                return ((l5 * t6 + o5) * t6 + s4) * t6;
              }
              return function(t6, e6) {
                var r7 = function(t7, e7) {
                  var r8, i7, n5, a6, h4, u6;
                  for (n5 = t7, u6 = 0; u6 < 8; u6++) {
                    if (a6 = f4(n5) - t7, B2(a6) < e7)
                      return n5;
                    if (B2(h4 = (3 * l5 * n5 + 2 * o5) * n5 + s4) < 1e-6)
                      break;
                    n5 -= a6 / h4;
                  }
                  if (i7 = 1, (n5 = t7) < (r8 = 0))
                    return r8;
                  if (n5 > i7)
                    return i7;
                  for (; r8 < i7; ) {
                    if (a6 = f4(n5), B2(a6 - t7) < e7)
                      return n5;
                    t7 > a6 ? r8 = n5 : i7 = n5, n5 = (i7 - r8) / 2 + r8;
                  }
                  return n5;
                }(t6, e6);
                return ((c5 * r7 + u5) * r7 + h3) * r7;
              }(t5, 1 / (200 * a5));
            }
            function ne(t5, e5) {
              var r6 = [], i6 = {};
              if (this.ms = e5, this.times = 1, t5) {
                for (var n4 in t5)
                  t5[o4](n4) && (i6[z3(n4)] = t5[n4], r6.push(z3(n4)));
                r6.sort(H2);
              }
              this.anim = i6, this.top = r6[r6.length - 1], this.percents = r6;
            }
            function ae(r6, i6, a5, s4, l5, h3) {
              a5 = z3(a5);
              var u5, c5, p4, d4, g4, y3, m4 = r6.ms, b4 = {}, _4 = {}, w4 = {};
              if (s4)
                for (B3 = 0, C3 = Kt.length; B3 < C3; B3++) {
                  var k4 = Kt[B3];
                  if (k4.el.id == i6.id && k4.anim == r6) {
                    k4.percent != a5 ? (Kt.splice(B3, 1), p4 = 1) : c5 = k4, i6.attr(k4.totalOrigin);
                    break;
                  }
                }
              else
                s4 = +_4;
              for (var B3 = 0, C3 = r6.percents.length; B3 < C3; B3++) {
                if (r6.percents[B3] == a5 || r6.percents[B3] > s4 * r6.top) {
                  a5 = r6.percents[B3], g4 = r6.percents[B3 - 1] || 0, m4 = m4 / r6.top * (a5 - g4), d4 = r6.percents[B3 + 1], u5 = r6.anim[a5];
                  break;
                }
                s4 && i6.attr(r6.anim[r6.percents[B3]]);
              }
              if (u5) {
                if (c5)
                  c5.initstatus = s4, c5.start = /* @__PURE__ */ new Date() - c5.ms * s4;
                else {
                  for (var S2 in u5)
                    if (u5[o4](S2) && (I2[o4](S2) || i6.paper.customAttributes[o4](S2)))
                      switch (b4[S2] = i6.attr(S2), null == b4[S2] && (b4[S2] = j3[S2]), _4[S2] = u5[S2], I2[S2]) {
                        case T2:
                          w4[S2] = (_4[S2] - b4[S2]) / m4;
                          break;
                        case "colour":
                          b4[S2] = e4.getRGB(b4[S2]);
                          var A3 = e4.getRGB(_4[S2]);
                          w4[S2] = { r: (A3.r - b4[S2].r) / m4, g: (A3.g - b4[S2].g) / m4, b: (A3.b - b4[S2].b) / m4 };
                          break;
                        case "path":
                          var M3 = Tt(b4[S2], _4[S2]), E3 = M3[1];
                          for (b4[S2] = M3[0], w4[S2] = [], B3 = 0, C3 = b4[S2].length; B3 < C3; B3++) {
                            w4[S2][B3] = [0];
                            for (var N3 = 1, P3 = b4[S2][B3].length; N3 < P3; N3++)
                              w4[S2][B3][N3] = (E3[B3][N3] - b4[S2][B3][N3]) / m4;
                          }
                          break;
                        case "transform":
                          var F4 = i6._, R2 = Lt(F4[S2], _4[S2]);
                          if (R2)
                            for (b4[S2] = R2.from, _4[S2] = R2.to, w4[S2] = [], w4[S2].real = true, B3 = 0, C3 = b4[S2].length; B3 < C3; B3++)
                              for (w4[S2][B3] = [b4[S2][B3][0]], N3 = 1, P3 = b4[S2][B3].length; N3 < P3; N3++)
                                w4[S2][B3][N3] = (_4[S2][B3][N3] - b4[S2][B3][N3]) / m4;
                          else {
                            var D3 = i6.matrix || new Pt(), q3 = { _: { transform: F4.transform }, getBBox: function() {
                              return i6.getBBox(1);
                            } };
                            b4[S2] = [D3.a, D3.b, D3.c, D3.d, D3.e, D3.f], Et(q3, _4[S2]), _4[S2] = q3._.transform, w4[S2] = [(q3.matrix.a - D3.a) / m4, (q3.matrix.b - D3.b) / m4, (q3.matrix.c - D3.c) / m4, (q3.matrix.d - D3.d) / m4, (q3.matrix.e - D3.e) / m4, (q3.matrix.f - D3.f) / m4];
                          }
                          break;
                        case "csv":
                          var O3 = x2(u5[S2])[v3](n3), V2 = x2(b4[S2])[v3](n3);
                          if ("clip-rect" == S2)
                            for (b4[S2] = V2, w4[S2] = [], B3 = V2.length; B3--; )
                              w4[S2][B3] = (O3[B3] - b4[S2][B3]) / m4;
                          _4[S2] = O3;
                          break;
                        default:
                          for (O3 = [][f3](u5[S2]), V2 = [][f3](b4[S2]), w4[S2] = [], B3 = i6.paper.customAttributes[S2].length; B3--; )
                            w4[S2][B3] = ((O3[B3] || 0) - (V2[B3] || 0)) / m4;
                      }
                  var W2 = u5.easing, Y2 = e4.easing_formulas[W2];
                  if (!Y2)
                    if ((Y2 = x2(W2).match(L2)) && 5 == Y2.length) {
                      var G2 = Y2;
                      Y2 = function(t5) {
                        return ie(t5, +G2[1], +G2[2], +G2[3], +G2[4], m4);
                      };
                    } else
                      Y2 = X;
                  if (k4 = { anim: r6, percent: a5, timestamp: y3 = u5.start || r6.start || +/* @__PURE__ */ new Date(), start: y3 + (r6.del || 0), status: 0, initstatus: s4 || 0, stop: false, ms: m4, easing: Y2, from: b4, diff: w4, to: _4, el: i6, callback: u5.callback, prev: g4, next: d4, repeat: h3 || r6.times, origin: i6.attr(), totalOrigin: l5 }, Kt.push(k4), s4 && !c5 && !p4 && (k4.stop = true, k4.start = /* @__PURE__ */ new Date() - m4 * s4, 1 == Kt.length))
                    return ee();
                  p4 && (k4.start = /* @__PURE__ */ new Date() - k4.ms * s4), 1 == Kt.length && te(ee);
                }
                t4("raphael.anim.start." + i6.id, i6, r6);
              }
            }
            function se(t5) {
              for (var e5 = 0; e5 < Kt.length; e5++)
                Kt[e5].el.paper == t5 && Kt.splice(e5--, 1);
            }
            Wt.animateWith = function(t5, r6, i6, n4, a5, s4) {
              if (this.removed)
                return s4 && s4.call(this), this;
              var o5 = i6 instanceof ne ? i6 : e4.animation(i6, n4, a5, s4);
              ae(o5, this, o5.percents[0], null, this.attr());
              for (var l5 = 0, h3 = Kt.length; l5 < h3; l5++)
                if (Kt[l5].anim == r6 && Kt[l5].el == t5) {
                  Kt[h3 - 1].start = Kt[l5].start;
                  break;
                }
              return this;
            }, Wt.onAnimation = function(e5) {
              return e5 ? t4.on("raphael.anim.frame." + this.id, e5) : t4.unbind("raphael.anim.frame." + this.id), this;
            }, ne.prototype.delay = function(t5) {
              var e5 = new ne(this.anim, this.ms);
              return e5.times = this.times, e5.del = +t5 || 0, e5;
            }, ne.prototype.repeat = function(t5) {
              var e5 = new ne(this.anim, this.ms);
              return e5.del = this.del, e5.times = _3.floor(w3(t5, 0)) || 1, e5;
            }, e4.animation = function(t5, r6, i6, n4) {
              if (t5 instanceof ne)
                return t5;
              !e4.is(i6, "function") && i6 || (n4 = n4 || i6 || null, i6 = null), t5 = Object(t5), r6 = +r6 || 0;
              var a5, s4, l5 = {};
              for (s4 in t5)
                t5[o4](s4) && z3(s4) != s4 && z3(s4) + "%" != s4 && (a5 = true, l5[s4] = t5[s4]);
              if (a5)
                return i6 && (l5.easing = i6), n4 && (l5.callback = n4), new ne({ 100: l5 }, r6);
              if (n4) {
                var h3 = 0;
                for (var u5 in t5) {
                  var c5 = F3(u5);
                  t5[o4](u5) && c5 > h3 && (h3 = c5);
                }
                !t5[h3 += "%"].callback && (t5[h3].callback = n4);
              }
              return new ne(t5, r6);
            }, Wt.animate = function(t5, r6, i6, n4) {
              if (this.removed)
                return n4 && n4.call(this), this;
              var a5 = t5 instanceof ne ? t5 : e4.animation(t5, r6, i6, n4);
              return ae(a5, this, a5.percents[0], null, this.attr()), this;
            }, Wt.setTime = function(t5, e5) {
              return t5 && null != e5 && this.status(t5, k3(e5, t5.ms) / t5.ms), this;
            }, Wt.status = function(t5, e5) {
              var r6, i6, n4 = [], a5 = 0;
              if (null != e5)
                return ae(t5, this, -1, k3(e5, 1)), this;
              for (r6 = Kt.length; a5 < r6; a5++)
                if ((i6 = Kt[a5]).el.id == this.id && (!t5 || i6.anim == t5)) {
                  if (t5)
                    return i6.status;
                  n4.push({ anim: i6.anim, status: i6.status });
                }
              return t5 ? 0 : n4;
            }, Wt.pause = function(e5) {
              for (var r6 = 0; r6 < Kt.length; r6++)
                Kt[r6].el.id != this.id || e5 && Kt[r6].anim != e5 || false !== t4("raphael.anim.pause." + this.id, this, Kt[r6].anim) && (Kt[r6].paused = true);
              return this;
            }, Wt.resume = function(e5) {
              for (var r6 = 0; r6 < Kt.length; r6++)
                if (Kt[r6].el.id == this.id && (!e5 || Kt[r6].anim == e5)) {
                  var i6 = Kt[r6];
                  false !== t4("raphael.anim.resume." + this.id, this, i6.anim) && (delete i6.paused, this.status(i6.anim, i6.status));
                }
              return this;
            }, Wt.stop = function(e5) {
              for (var r6 = 0; r6 < Kt.length; r6++)
                Kt[r6].el.id != this.id || e5 && Kt[r6].anim != e5 || false !== t4("raphael.anim.stop." + this.id, this, Kt[r6].anim) && Kt.splice(r6--, 1);
              return this;
            }, t4.on("raphael.remove", se), t4.on("raphael.clear", se), Wt.toString = function() {
              return "Rapha\xEBl\u2019s object";
            };
            var oe, le, he, ue, ce = function(t5) {
              if (this.items = [], this.length = 0, this.type = "set", t5)
                for (var e5 = 0, r6 = t5.length; e5 < r6; e5++)
                  !t5[e5] || t5[e5].constructor != Wt.constructor && t5[e5].constructor != ce || (this[this.items.length] = this.items[this.items.length] = t5[e5], this.length++);
            }, fe = ce.prototype;
            for (var pe in fe.push = function() {
              for (var t5, e5, r6 = 0, i6 = arguments.length; r6 < i6; r6++)
                !(t5 = arguments[r6]) || t5.constructor != Wt.constructor && t5.constructor != ce || (this[e5 = this.items.length] = this.items[e5] = t5, this.length++);
              return this;
            }, fe.pop = function() {
              return this.length && delete this[this.length--], this.items.pop();
            }, fe.forEach = function(t5, e5) {
              for (var r6 = 0, i6 = this.items.length; r6 < i6; r6++)
                if (false === t5.call(e5, this.items[r6], r6))
                  return this;
              return this;
            }, Wt)
              Wt[o4](pe) && (fe[pe] = function(t5) {
                return function() {
                  var e5 = arguments;
                  return this.forEach(function(r6) {
                    r6[t5][c4](r6, e5);
                  });
                };
              }(pe));
            return fe.attr = function(t5, r6) {
              if (t5 && e4.is(t5, A2) && e4.is(t5[0], "object"))
                for (var i6 = 0, n4 = t5.length; i6 < n4; i6++)
                  this.items[i6].attr(t5[i6]);
              else
                for (var a5 = 0, s4 = this.items.length; a5 < s4; a5++)
                  this.items[a5].attr(t5, r6);
              return this;
            }, fe.clear = function() {
              for (; this.length; )
                this.pop();
            }, fe.splice = function(t5, e5, r6) {
              t5 = t5 < 0 ? w3(this.length + t5, 0) : t5, e5 = w3(0, k3(this.length - t5, e5));
              var i6, n4 = [], a5 = [], s4 = [];
              for (i6 = 2; i6 < arguments.length; i6++)
                s4.push(arguments[i6]);
              for (i6 = 0; i6 < e5; i6++)
                a5.push(this[t5 + i6]);
              for (; i6 < this.length - t5; i6++)
                n4.push(this[t5 + i6]);
              var o5 = s4.length;
              for (i6 = 0; i6 < o5 + n4.length; i6++)
                this.items[t5 + i6] = this[t5 + i6] = i6 < o5 ? s4[i6] : n4[i6 - o5];
              for (i6 = this.items.length = this.length -= e5 - o5; this[i6]; )
                delete this[i6++];
              return new ce(a5);
            }, fe.exclude = function(t5) {
              for (var e5 = 0, r6 = this.length; e5 < r6; e5++)
                if (this[e5] == t5)
                  return this.splice(e5, 1), true;
            }, fe.animate = function(t5, r6, i6, n4) {
              (e4.is(i6, "function") || !i6) && (n4 = i6 || null);
              var a5, s4, o5 = this.items.length, l5 = o5, h3 = this;
              if (!o5)
                return this;
              n4 && (s4 = function() {
                !--o5 && n4.call(h3);
              }), i6 = e4.is(i6, "string") ? i6 : s4;
              var u5 = e4.animation(t5, r6, i6, s4);
              for (a5 = this.items[--l5].animate(u5); l5--; )
                this.items[l5] && !this.items[l5].removed && this.items[l5].animateWith(a5, u5, u5), this.items[l5] && !this.items[l5].removed || o5--;
              return this;
            }, fe.insertAfter = function(t5) {
              for (var e5 = this.items.length; e5--; )
                this.items[e5].insertAfter(t5);
              return this;
            }, fe.getBBox = function() {
              for (var t5 = [], e5 = [], r6 = [], i6 = [], n4 = this.items.length; n4--; )
                if (!this.items[n4].removed) {
                  var a5 = this.items[n4].getBBox();
                  t5.push(a5.x), e5.push(a5.y), r6.push(a5.x + a5.width), i6.push(a5.y + a5.height);
                }
              return { x: t5 = k3[c4](0, t5), y: e5 = k3[c4](0, e5), x2: r6 = w3[c4](0, r6), y2: i6 = w3[c4](0, i6), width: r6 - t5, height: i6 - e5 };
            }, fe.clone = function(t5) {
              t5 = this.paper.set();
              for (var e5 = 0, r6 = this.items.length; e5 < r6; e5++)
                t5.push(this.items[e5].clone());
              return t5;
            }, fe.toString = function() {
              return "Rapha\xEBl\u2018s set";
            }, fe.glow = function(t5) {
              var e5 = this.paper.set();
              return this.forEach(function(r6, i6) {
                var n4 = r6.glow(t5);
                null != n4 && n4.forEach(function(t6, r7) {
                  e5.push(t6);
                });
              }), e5;
            }, fe.isPointInside = function(t5, e5) {
              var r6 = false;
              return this.forEach(function(i6) {
                if (i6.isPointInside(t5, e5))
                  return r6 = true, false;
              }), r6;
            }, e4.registerFont = function(t5) {
              if (!t5.face)
                return t5;
              this.fonts = this.fonts || {};
              var e5 = { w: t5.w, face: {}, glyphs: {} }, r6 = t5.face["font-family"];
              for (var i6 in t5.face)
                t5.face[o4](i6) && (e5.face[i6] = t5.face[i6]);
              if (this.fonts[r6] ? this.fonts[r6].push(e5) : this.fonts[r6] = [e5], !t5.svg) {
                for (var n4 in e5.face["units-per-em"] = F3(t5.face["units-per-em"], 10), t5.glyphs)
                  if (t5.glyphs[o4](n4)) {
                    var a5 = t5.glyphs[n4];
                    if (e5.glyphs[n4] = { w: a5.w, k: {}, d: a5.d && "M" + a5.d.replace(/[mlcxtrv]/g, function(t6) {
                      return { l: "L", c: "C", x: "z", t: "m", r: "l", v: "c" }[t6] || "M";
                    }) + "z" }, a5.k)
                      for (var s4 in a5.k)
                        a5[o4](s4) && (e5.glyphs[n4].k[s4] = a5.k[s4]);
                  }
              }
              return t5;
            }, i5.getFont = function(t5, r6, i6, n4) {
              if (n4 = n4 || "normal", i6 = i6 || "normal", r6 = +r6 || { normal: 400, bold: 700, lighter: 300, bolder: 800 }[r6] || 400, e4.fonts) {
                var a5, s4 = e4.fonts[t5];
                if (!s4) {
                  var l5 = new RegExp("(^|\\s)" + t5.replace(/[^\w\d\s+!~.:_-]/g, d3) + "(\\s|$)", "i");
                  for (var h3 in e4.fonts)
                    if (e4.fonts[o4](h3) && l5.test(h3)) {
                      s4 = e4.fonts[h3];
                      break;
                    }
                }
                if (s4)
                  for (var u5 = 0, c5 = s4.length; u5 < c5 && ((a5 = s4[u5]).face["font-weight"] != r6 || a5.face["font-style"] != i6 && a5.face["font-style"] || a5.face["font-stretch"] != n4); u5++)
                    ;
                return a5;
              }
            }, i5.print = function(t5, r6, i6, a5, s4, o5, l5, h3) {
              o5 = o5 || "middle", l5 = w3(k3(l5 || 0, 1), -1), h3 = w3(k3(h3 || 1, 3), 1);
              var u5, c5 = x2(i6)[v3](d3), f4 = 0, p4 = 0, g4 = d3;
              if (e4.is(a5, "string") && (a5 = this.getFont(a5)), a5) {
                u5 = (s4 || 16) / a5.face["units-per-em"];
                for (var y3 = a5.face.bbox[v3](n3), m4 = +y3[0], b4 = y3[3] - y3[1], _4 = 0, B3 = +y3[1] + ("baseline" == o5 ? b4 + +a5.face.descent : b4 / 2), C3 = 0, S2 = c5.length; C3 < S2; C3++) {
                  if ("\n" == c5[C3])
                    f4 = 0, A3 = 0, p4 = 0, _4 += b4 * h3;
                  else {
                    var T3 = p4 && a5.glyphs[c5[C3 - 1]] || {}, A3 = a5.glyphs[c5[C3]];
                    f4 += p4 ? (T3.w || a5.w) + (T3.k && T3.k[c5[C3]] || 0) + a5.w * l5 : 0, p4 = 1;
                  }
                  A3 && A3.d && (g4 += e4.transformPath(A3.d, ["t", f4 * u5, _4 * u5, "s", u5, u5, m4, B3, "t", (t5 - m4) / u5, (r6 - B3) / u5]));
                }
              }
              return this.path(g4).attr({ fill: "#000", stroke: "none" });
            }, i5.add = function(t5) {
              if (e4.is(t5, "array"))
                for (var r6, i6 = this.set(), n4 = 0, s4 = t5.length; n4 < s4; n4++)
                  r6 = t5[n4] || {}, a4[o4](r6.type) && i6.push(this[r6.type]().attr(r6));
              return i6;
            }, e4.format = function(t5, r6) {
              var i6 = e4.is(r6, A2) ? [0][f3](r6) : arguments;
              return t5 && e4.is(t5, "string") && i6.length - 1 && (t5 = t5.replace(s3, function(t6, e5) {
                return null == i6[++e5] ? d3 : i6[e5];
              })), t5 || d3;
            }, e4.fullfill = (oe = /\{([^\}]+)\}/g, le = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, function(t5, e5) {
              return String(t5).replace(oe, function(t6, r6) {
                return function(t7, e6, r7) {
                  var i6 = r7;
                  return e6.replace(le, function(t8, e7, r8, n4, a5) {
                    e7 = e7 || n4, i6 && (e7 in i6 && (i6 = i6[e7]), "function" == typeof i6 && a5 && (i6 = i6()));
                  }), i6 = (null == i6 || i6 == r7 ? t7 : i6) + "";
                }(t6, r6, e5);
              });
            }), e4.ninja = function() {
              if (h2.was)
                l4.win.Raphael = h2.is;
              else {
                window.Raphael = void 0;
                try {
                  delete window.Raphael;
                } catch (t5) {
                }
              }
              return e4;
            }, e4.st = fe, t4.on("raphael.DOMload", function() {
              r5 = true;
            }), null == (he = document).readyState && he.addEventListener && (he.addEventListener("DOMContentLoaded", ue = function() {
              he.removeEventListener("DOMContentLoaded", ue, false), he.readyState = "complete";
            }, false), he.readyState = "loading"), function t5() {
              /in/.test(he.readyState) ? setTimeout(t5, 9) : e4.eve("raphael.DOMload");
            }(), e4;
          }.apply(e3, i4)) || (t3.exports = n2);
        }, function(t3, e3, r4) {
          var i4, n2;
          i4 = [r4(0), r4(3), r4(4)], void 0 === (n2 = function(t4) {
            return t4;
          }.apply(e3, i4)) || (t3.exports = n2);
        }, function(t3, e3, r4) {
          var i4, n2, a4, s3, o4, l4, h2, u4, c4, f3, p3, d3, g3, x2;
          s3 = "hasOwnProperty", o4 = /[\.\/]/, l4 = /\s*,\s*/, h2 = function(t4, e4) {
            return t4 - e4;
          }, u4 = { n: {} }, c4 = function() {
            for (var t4 = 0, e4 = this.length; t4 < e4; t4++)
              if (void 0 !== this[t4])
                return this[t4];
          }, f3 = function() {
            for (var t4 = this.length; --t4; )
              if (void 0 !== this[t4])
                return this[t4];
          }, p3 = Object.prototype.toString, d3 = String, g3 = Array.isArray || function(t4) {
            return t4 instanceof Array || "[object Array]" == p3.call(t4);
          }, (x2 = function(t4, e4) {
            var r5, i5 = a4, s4 = Array.prototype.slice.call(arguments, 2), o5 = x2.listeners(t4), l5 = 0, u5 = [], p4 = {}, d4 = [], g4 = n2;
            d4.firstDefined = c4, d4.lastDefined = f3, n2 = t4, a4 = 0;
            for (var v3 = 0, y2 = o5.length; v3 < y2; v3++)
              "zIndex" in o5[v3] && (u5.push(o5[v3].zIndex), o5[v3].zIndex < 0 && (p4[o5[v3].zIndex] = o5[v3]));
            for (u5.sort(h2); u5[l5] < 0; )
              if (r5 = p4[u5[l5++]], d4.push(r5.apply(e4, s4)), a4)
                return a4 = i5, d4;
            for (v3 = 0; v3 < y2; v3++)
              if ("zIndex" in (r5 = o5[v3]))
                if (r5.zIndex == u5[l5]) {
                  if (d4.push(r5.apply(e4, s4)), a4)
                    break;
                  do {
                    if ((r5 = p4[u5[++l5]]) && d4.push(r5.apply(e4, s4)), a4)
                      break;
                  } while (r5);
                } else
                  p4[r5.zIndex] = r5;
              else if (d4.push(r5.apply(e4, s4)), a4)
                break;
            return a4 = i5, n2 = g4, d4;
          })._events = u4, x2.listeners = function(t4) {
            var e4, r5, i5, n3, a5, s4, l5, h3, c5 = g3(t4) ? t4 : t4.split(o4), f4 = u4, p4 = [f4], d4 = [];
            for (n3 = 0, a5 = c5.length; n3 < a5; n3++) {
              for (h3 = [], s4 = 0, l5 = p4.length; s4 < l5; s4++)
                for (r5 = [(f4 = p4[s4].n)[c5[n3]], f4["*"]], i5 = 2; i5--; )
                  (e4 = r5[i5]) && (h3.push(e4), d4 = d4.concat(e4.f || []));
              p4 = h3;
            }
            return d4;
          }, x2.separator = function(t4) {
            t4 ? (t4 = "[" + (t4 = d3(t4).replace(/(?=[\.\^\]\[\-])/g, "\\")) + "]", o4 = new RegExp(t4)) : o4 = /[\.\/]/;
          }, x2.on = function(t4, e4) {
            if ("function" != typeof e4)
              return function() {
              };
            for (var r5 = g3(t4) ? g3(t4[0]) ? t4 : [t4] : d3(t4).split(l4), i5 = 0, n3 = r5.length; i5 < n3; i5++)
              !function(t5) {
                for (var r6, i6 = g3(t5) ? t5 : d3(t5).split(o4), n4 = u4, a5 = 0, s4 = i6.length; a5 < s4; a5++)
                  n4 = (n4 = n4.n).hasOwnProperty(i6[a5]) && n4[i6[a5]] || (n4[i6[a5]] = { n: {} });
                for (n4.f = n4.f || [], a5 = 0, s4 = n4.f.length; a5 < s4; a5++)
                  if (n4.f[a5] == e4) {
                    r6 = true;
                    break;
                  }
                !r6 && n4.f.push(e4);
              }(r5[i5]);
            return function(t5) {
              +t5 == +t5 && (e4.zIndex = +t5);
            };
          }, x2.f = function(t4) {
            var e4 = [].slice.call(arguments, 1);
            return function() {
              x2.apply(null, [t4, null].concat(e4).concat([].slice.call(arguments, 0)));
            };
          }, x2.stop = function() {
            a4 = 1;
          }, x2.nt = function(t4) {
            var e4 = g3(n2) ? n2.join(".") : n2;
            return t4 ? new RegExp("(?:\\.|\\/|^)" + t4 + "(?:\\.|\\/|$)").test(e4) : e4;
          }, x2.nts = function() {
            return g3(n2) ? n2 : n2.split(o4);
          }, x2.off = x2.unbind = function(t4, e4) {
            if (t4) {
              var r5 = g3(t4) ? g3(t4[0]) ? t4 : [t4] : d3(t4).split(l4);
              if (r5.length > 1)
                for (var i5 = 0, n3 = r5.length; i5 < n3; i5++)
                  x2.off(r5[i5], e4);
              else {
                r5 = g3(t4) ? t4 : d3(t4).split(o4);
                var a5, h3, c5, f4, p4, v3 = [u4];
                for (i5 = 0, n3 = r5.length; i5 < n3; i5++)
                  for (f4 = 0; f4 < v3.length; f4 += c5.length - 2) {
                    if (c5 = [f4, 1], a5 = v3[f4].n, "*" != r5[i5])
                      a5[r5[i5]] && c5.push(a5[r5[i5]]);
                    else
                      for (h3 in a5)
                        a5[s3](h3) && c5.push(a5[h3]);
                    v3.splice.apply(v3, c5);
                  }
                for (i5 = 0, n3 = v3.length; i5 < n3; i5++)
                  for (a5 = v3[i5]; a5.n; ) {
                    if (e4) {
                      if (a5.f) {
                        for (f4 = 0, p4 = a5.f.length; f4 < p4; f4++)
                          if (a5.f[f4] == e4) {
                            a5.f.splice(f4, 1);
                            break;
                          }
                        !a5.f.length && delete a5.f;
                      }
                      for (h3 in a5.n)
                        if (a5.n[s3](h3) && a5.n[h3].f) {
                          var y2 = a5.n[h3].f;
                          for (f4 = 0, p4 = y2.length; f4 < p4; f4++)
                            if (y2[f4] == e4) {
                              y2.splice(f4, 1);
                              break;
                            }
                          !y2.length && delete a5.n[h3].f;
                        }
                    } else
                      for (h3 in delete a5.f, a5.n)
                        a5.n[s3](h3) && a5.n[h3].f && delete a5.n[h3].f;
                    a5 = a5.n;
                  }
              }
            } else
              x2._events = u4 = { n: {} };
          }, x2.once = function(t4, e4) {
            var r5 = function() {
              return x2.off(t4, r5), e4.apply(this, arguments);
            };
            return x2.on(t4, r5);
          }, x2.version = "0.5.0", x2.toString = function() {
            return "You are running Eve 0.5.0";
          }, t3.exports ? t3.exports = x2 : void 0 === (i4 = function() {
            return x2;
          }.apply(e3, [])) || (t3.exports = i4);
        }, function(t3, e3, r4) {
          var i4, n2;
          i4 = [r4(0)], void 0 === (n2 = function(t4) {
            if (!t4 || t4.svg) {
              var e4 = "hasOwnProperty", r5 = String, i5 = parseFloat, n3 = parseInt, a4 = Math, s3 = a4.max, o4 = a4.abs, l4 = a4.pow, h2 = /[, ]+/, u4 = t4.eve, c4 = "", f3 = " ", p3 = "http://www.w3.org/1999/xlink", d3 = { block: "M5,0 0,2.5 5,5z", classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z", diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z", open: "M6,1 1,3.5 6,6", oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z" }, g3 = {};
              t4.toString = function() {
                return "Your browser supports SVG.\nYou are running Rapha\xEBl " + this.version;
              };
              var x2 = function(i6, n4) {
                if (n4)
                  for (var a5 in "string" == typeof i6 && (i6 = x2(i6)), n4)
                    n4[e4](a5) && ("xlink:" == a5.substring(0, 6) ? i6.setAttributeNS(p3, a5.substring(6), r5(n4[a5])) : i6.setAttribute(a5, r5(n4[a5])));
                else
                  (i6 = t4._g.doc.createElementNS("http://www.w3.org/2000/svg", i6)).style && (i6.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
                return i6;
              }, v3 = function(e5, n4) {
                var h3 = "linear", u5 = e5.id + n4, f4 = 0.5, p4 = 0.5, d4 = e5.node, g4 = e5.paper, v4 = d4.style, m4 = t4._g.doc.getElementById(u5);
                if (!m4) {
                  if (n4 = (n4 = r5(n4).replace(t4._radial_gradient, function(t5, e6, r6) {
                    if (h3 = "radial", e6 && r6) {
                      f4 = i5(e6);
                      var n5 = 2 * ((p4 = i5(r6)) > 0.5) - 1;
                      l4(f4 - 0.5, 2) + l4(p4 - 0.5, 2) > 0.25 && (p4 = a4.sqrt(0.25 - l4(f4 - 0.5, 2)) * n5 + 0.5) && 0.5 != p4 && (p4 = p4.toFixed(5) - 1e-5 * n5);
                    }
                    return c4;
                  })).split(/\s*\-\s*/), "linear" == h3) {
                    var b4 = n4.shift();
                    if (b4 = -i5(b4), isNaN(b4))
                      return null;
                    var _4 = [0, 0, a4.cos(t4.rad(b4)), a4.sin(t4.rad(b4))], w4 = 1 / (s3(o4(_4[2]), o4(_4[3])) || 1);
                    _4[2] *= w4, _4[3] *= w4, _4[2] < 0 && (_4[0] = -_4[2], _4[2] = 0), _4[3] < 0 && (_4[1] = -_4[3], _4[3] = 0);
                  }
                  var k4 = t4._parseDots(n4);
                  if (!k4)
                    return null;
                  if (u5 = u5.replace(/[\(\)\s,\xb0#]/g, "_"), e5.gradient && u5 != e5.gradient.id && (g4.defs.removeChild(e5.gradient), delete e5.gradient), !e5.gradient) {
                    m4 = x2(h3 + "Gradient", { id: u5 }), e5.gradient = m4, x2(m4, "radial" == h3 ? { fx: f4, fy: p4 } : { x1: _4[0], y1: _4[1], x2: _4[2], y2: _4[3], gradientTransform: e5.matrix.invert() }), g4.defs.appendChild(m4);
                    for (var B3 = 0, C3 = k4.length; B3 < C3; B3++)
                      m4.appendChild(x2("stop", { offset: k4[B3].offset ? k4[B3].offset : B3 ? "100%" : "0%", "stop-color": k4[B3].color || "#fff", "stop-opacity": isFinite(k4[B3].opacity) ? k4[B3].opacity : 1 }));
                  }
                }
                return x2(d4, { fill: y2(u5), opacity: 1, "fill-opacity": 1 }), v4.fill = c4, v4.opacity = 1, v4.fillOpacity = 1, 1;
              }, y2 = function(t5) {
                if ((e5 = document.documentMode) && (9 === e5 || 10 === e5))
                  return "url('#" + t5 + "')";
                var e5, r6 = document.location;
                return "url('" + (r6.protocol + "//" + r6.host + r6.pathname + r6.search) + "#" + t5 + "')";
              }, m3 = function(t5) {
                var e5 = t5.getBBox(1);
                x2(t5.pattern, { patternTransform: t5.matrix.invert() + " translate(" + e5.x + "," + e5.y + ")" });
              }, b3 = function(i6, n4, a5) {
                if ("path" == i6.type) {
                  for (var s4, o5, l5, h3, u5, f4 = r5(n4).toLowerCase().split("-"), p4 = i6.paper, v4 = a5 ? "end" : "start", y3 = i6.node, m4 = i6.attrs, b4 = m4["stroke-width"], _4 = f4.length, w4 = "classic", k4 = 3, B3 = 3, C3 = 5; _4--; )
                    switch (f4[_4]) {
                      case "block":
                      case "classic":
                      case "oval":
                      case "diamond":
                      case "open":
                      case "none":
                        w4 = f4[_4];
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
                  if ("open" == w4 ? (k4 += 2, B3 += 2, C3 += 2, l5 = 1, h3 = a5 ? 4 : 1, u5 = { fill: "none", stroke: m4.stroke }) : (h3 = l5 = k4 / 2, u5 = { fill: m4.stroke, stroke: "none" }), i6._.arrows ? a5 ? (i6._.arrows.endPath && g3[i6._.arrows.endPath]--, i6._.arrows.endMarker && g3[i6._.arrows.endMarker]--) : (i6._.arrows.startPath && g3[i6._.arrows.startPath]--, i6._.arrows.startMarker && g3[i6._.arrows.startMarker]--) : i6._.arrows = {}, "none" != w4) {
                    var S2 = "raphael-marker-" + w4, T3 = "raphael-marker-" + v4 + w4 + k4 + B3 + "-obj" + i6.id;
                    t4._g.doc.getElementById(S2) ? g3[S2]++ : (p4.defs.appendChild(x2(x2("path"), { "stroke-linecap": "round", d: d3[w4], id: S2 })), g3[S2] = 1);
                    var A3, M3 = t4._g.doc.getElementById(T3);
                    M3 ? (g3[T3]++, A3 = M3.getElementsByTagName("use")[0]) : (M3 = x2(x2("marker"), { id: T3, markerHeight: B3, markerWidth: k4, orient: "auto", refX: h3, refY: B3 / 2 }), A3 = x2(x2("use"), { "xlink:href": "#" + S2, transform: (a5 ? "rotate(180 " + k4 / 2 + " " + B3 / 2 + ") " : c4) + "scale(" + k4 / C3 + "," + B3 / C3 + ")", "stroke-width": (1 / ((k4 / C3 + B3 / C3) / 2)).toFixed(4) }), M3.appendChild(A3), p4.defs.appendChild(M3), g3[T3] = 1), x2(A3, u5);
                    var E2 = l5 * ("diamond" != w4 && "oval" != w4);
                    a5 ? (s4 = i6._.arrows.startdx * b4 || 0, o5 = t4.getTotalLength(m4.path) - E2 * b4) : (s4 = E2 * b4, o5 = t4.getTotalLength(m4.path) - (i6._.arrows.enddx * b4 || 0)), (u5 = {})["marker-" + v4] = "url(#" + T3 + ")", (o5 || s4) && (u5.d = t4.getSubpath(m4.path, s4, o5)), x2(y3, u5), i6._.arrows[v4 + "Path"] = S2, i6._.arrows[v4 + "Marker"] = T3, i6._.arrows[v4 + "dx"] = E2, i6._.arrows[v4 + "Type"] = w4, i6._.arrows[v4 + "String"] = n4;
                  } else
                    a5 ? (s4 = i6._.arrows.startdx * b4 || 0, o5 = t4.getTotalLength(m4.path) - s4) : (s4 = 0, o5 = t4.getTotalLength(m4.path) - (i6._.arrows.enddx * b4 || 0)), i6._.arrows[v4 + "Path"] && x2(y3, { d: t4.getSubpath(m4.path, s4, o5) }), delete i6._.arrows[v4 + "Path"], delete i6._.arrows[v4 + "Marker"], delete i6._.arrows[v4 + "dx"], delete i6._.arrows[v4 + "Type"], delete i6._.arrows[v4 + "String"];
                  for (u5 in g3)
                    if (g3[e4](u5) && !g3[u5]) {
                      var N2 = t4._g.doc.getElementById(u5);
                      N2 && N2.parentNode.removeChild(N2);
                    }
                }
              }, _3 = { "-": [3, 1], ".": [1, 1], "-.": [3, 1, 1, 1], "-..": [3, 1, 1, 1, 1, 1], ". ": [1, 3], "- ": [4, 3], "--": [8, 3], "- .": [4, 3, 1, 3], "--.": [8, 3, 1, 3], "--..": [8, 3, 1, 3, 1, 3] }, w3 = function(t5, e5, i6) {
                if (e5 = _3[r5(e5).toLowerCase()]) {
                  for (var n4 = t5.attrs["stroke-width"] || "1", a5 = { round: n4, square: n4, butt: 0 }[t5.attrs["stroke-linecap"] || i6["stroke-linecap"]] || 0, s4 = [], o5 = e5.length; o5--; )
                    s4[o5] = e5[o5] * n4 + (o5 % 2 ? 1 : -1) * a5;
                  x2(t5.node, { "stroke-dasharray": s4.join(",") });
                } else
                  x2(t5.node, { "stroke-dasharray": "none" });
              }, k3 = function(i6, a5) {
                var l5 = i6.node, u5 = i6.attrs, f4 = l5.style.visibility;
                for (var d4 in l5.style.visibility = "hidden", a5)
                  if (a5[e4](d4)) {
                    if (!t4._availableAttrs[e4](d4))
                      continue;
                    var g4 = a5[d4];
                    switch (u5[d4] = g4, d4) {
                      case "blur":
                        i6.blur(g4);
                        break;
                      case "title":
                        var y3 = l5.getElementsByTagName("title");
                        if (y3.length && (y3 = y3[0]))
                          y3.firstChild.nodeValue = g4;
                        else {
                          y3 = x2("title");
                          var _4 = t4._g.doc.createTextNode(g4);
                          y3.appendChild(_4), l5.appendChild(y3);
                        }
                        break;
                      case "href":
                      case "target":
                        var k4 = l5.parentNode;
                        if ("a" != k4.tagName.toLowerCase()) {
                          var C3 = x2("a");
                          k4.insertBefore(C3, l5), C3.appendChild(l5), k4 = C3;
                        }
                        "target" == d4 ? k4.setAttributeNS(p3, "show", "blank" == g4 ? "new" : g4) : k4.setAttributeNS(p3, d4, g4);
                        break;
                      case "cursor":
                        l5.style.cursor = g4;
                        break;
                      case "transform":
                        i6.transform(g4);
                        break;
                      case "arrow-start":
                        b3(i6, g4);
                        break;
                      case "arrow-end":
                        b3(i6, g4, 1);
                        break;
                      case "clip-rect":
                        var S2 = r5(g4).split(h2);
                        if (4 == S2.length) {
                          i6.clip && i6.clip.parentNode.parentNode.removeChild(i6.clip.parentNode);
                          var T3 = x2("clipPath"), A3 = x2("rect");
                          T3.id = t4.createUUID(), x2(A3, { x: S2[0], y: S2[1], width: S2[2], height: S2[3] }), T3.appendChild(A3), i6.paper.defs.appendChild(T3), x2(l5, { "clip-path": "url(#" + T3.id + ")" }), i6.clip = A3;
                        }
                        if (!g4) {
                          var M3 = l5.getAttribute("clip-path");
                          if (M3) {
                            var E2 = t4._g.doc.getElementById(M3.replace(/(^url\(#|\)$)/g, c4));
                            E2 && E2.parentNode.removeChild(E2), x2(l5, { "clip-path": c4 }), delete i6.clip;
                          }
                        }
                        break;
                      case "path":
                        "path" == i6.type && (x2(l5, { d: g4 ? u5.path = t4._pathToAbsolute(g4) : "M0,0" }), i6._.dirty = 1, i6._.arrows && ("startString" in i6._.arrows && b3(i6, i6._.arrows.startString), "endString" in i6._.arrows && b3(i6, i6._.arrows.endString, 1)));
                        break;
                      case "width":
                        if (l5.setAttribute(d4, g4), i6._.dirty = 1, !u5.fx)
                          break;
                        d4 = "x", g4 = u5.x;
                      case "x":
                        u5.fx && (g4 = -u5.x - (u5.width || 0));
                      case "rx":
                        if ("rx" == d4 && "rect" == i6.type)
                          break;
                      case "cx":
                        l5.setAttribute(d4, g4), i6.pattern && m3(i6), i6._.dirty = 1;
                        break;
                      case "height":
                        if (l5.setAttribute(d4, g4), i6._.dirty = 1, !u5.fy)
                          break;
                        d4 = "y", g4 = u5.y;
                      case "y":
                        u5.fy && (g4 = -u5.y - (u5.height || 0));
                      case "ry":
                        if ("ry" == d4 && "rect" == i6.type)
                          break;
                      case "cy":
                        l5.setAttribute(d4, g4), i6.pattern && m3(i6), i6._.dirty = 1;
                        break;
                      case "r":
                        "rect" == i6.type ? x2(l5, { rx: g4, ry: g4 }) : l5.setAttribute(d4, g4), i6._.dirty = 1;
                        break;
                      case "src":
                        "image" == i6.type && l5.setAttributeNS(p3, "href", g4);
                        break;
                      case "stroke-width":
                        1 == i6._.sx && 1 == i6._.sy || (g4 /= s3(o4(i6._.sx), o4(i6._.sy)) || 1), l5.setAttribute(d4, g4), u5["stroke-dasharray"] && w3(i6, u5["stroke-dasharray"], a5), i6._.arrows && ("startString" in i6._.arrows && b3(i6, i6._.arrows.startString), "endString" in i6._.arrows && b3(i6, i6._.arrows.endString, 1));
                        break;
                      case "stroke-dasharray":
                        w3(i6, g4, a5);
                        break;
                      case "fill":
                        var N2 = r5(g4).match(t4._ISURL);
                        if (N2) {
                          T3 = x2("pattern");
                          var L2 = x2("image");
                          T3.id = t4.createUUID(), x2(T3, { x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1 }), x2(L2, { x: 0, y: 0, "xlink:href": N2[1] }), T3.appendChild(L2), function(e5) {
                            t4._preload(N2[1], function() {
                              var t5 = this.offsetWidth, r6 = this.offsetHeight;
                              x2(e5, { width: t5, height: r6 }), x2(L2, { width: t5, height: r6 });
                            });
                          }(T3), i6.paper.defs.appendChild(T3), x2(l5, { fill: "url(#" + T3.id + ")" }), i6.pattern = T3, i6.pattern && m3(i6);
                          break;
                        }
                        var P2 = t4.getRGB(g4);
                        if (P2.error) {
                          if (("circle" == i6.type || "ellipse" == i6.type || "r" != r5(g4).charAt()) && v3(i6, g4)) {
                            if ("opacity" in u5 || "fill-opacity" in u5) {
                              var z3 = t4._g.doc.getElementById(l5.getAttribute("fill").replace(/^url\(#|\)$/g, c4));
                              if (z3) {
                                var F3 = z3.getElementsByTagName("stop");
                                x2(F3[F3.length - 1], { "stop-opacity": ("opacity" in u5 ? u5.opacity : 1) * ("fill-opacity" in u5 ? u5["fill-opacity"] : 1) });
                              }
                            }
                            u5.gradient = g4, u5.fill = "none";
                            break;
                          }
                        } else
                          delete a5.gradient, delete u5.gradient, !t4.is(u5.opacity, "undefined") && t4.is(a5.opacity, "undefined") && x2(l5, { opacity: u5.opacity }), !t4.is(u5["fill-opacity"], "undefined") && t4.is(a5["fill-opacity"], "undefined") && x2(l5, { "fill-opacity": u5["fill-opacity"] });
                        P2[e4]("opacity") && x2(l5, { "fill-opacity": P2.opacity > 1 ? P2.opacity / 100 : P2.opacity });
                      case "stroke":
                        P2 = t4.getRGB(g4), l5.setAttribute(d4, P2.hex), "stroke" == d4 && P2[e4]("opacity") && x2(l5, { "stroke-opacity": P2.opacity > 1 ? P2.opacity / 100 : P2.opacity }), "stroke" == d4 && i6._.arrows && ("startString" in i6._.arrows && b3(i6, i6._.arrows.startString), "endString" in i6._.arrows && b3(i6, i6._.arrows.endString, 1));
                        break;
                      case "gradient":
                        ("circle" == i6.type || "ellipse" == i6.type || "r" != r5(g4).charAt()) && v3(i6, g4);
                        break;
                      case "opacity":
                        u5.gradient && !u5[e4]("stroke-opacity") && x2(l5, { "stroke-opacity": g4 > 1 ? g4 / 100 : g4 });
                      case "fill-opacity":
                        if (u5.gradient) {
                          (z3 = t4._g.doc.getElementById(l5.getAttribute("fill").replace(/^url\(#|\)$/g, c4))) && (F3 = z3.getElementsByTagName("stop"), x2(F3[F3.length - 1], { "stop-opacity": g4 }));
                          break;
                        }
                      default:
                        "font-size" == d4 && (g4 = n3(g4, 10) + "px");
                        var R = d4.replace(/(\-.)/g, function(t5) {
                          return t5.substring(1).toUpperCase();
                        });
                        l5.style[R] = g4, i6._.dirty = 1, l5.setAttribute(d4, g4);
                    }
                  }
                B2(i6, a5), l5.style.visibility = f4;
              }, B2 = function(i6, a5) {
                if ("text" == i6.type && (a5[e4]("text") || a5[e4]("font") || a5[e4]("font-size") || a5[e4]("x") || a5[e4]("y"))) {
                  var s4 = i6.attrs, o5 = i6.node, l5 = o5.firstChild ? n3(t4._g.doc.defaultView.getComputedStyle(o5.firstChild, c4).getPropertyValue("font-size"), 10) : 10;
                  if (a5[e4]("text")) {
                    for (s4.text = a5.text; o5.firstChild; )
                      o5.removeChild(o5.firstChild);
                    for (var h3, u5 = r5(a5.text).split("\n"), f4 = [], p4 = 0, d4 = u5.length; p4 < d4; p4++)
                      h3 = x2("tspan"), p4 && x2(h3, { dy: 1.2 * l5, x: s4.x }), h3.appendChild(t4._g.doc.createTextNode(u5[p4])), o5.appendChild(h3), f4[p4] = h3;
                  } else
                    for (p4 = 0, d4 = (f4 = o5.getElementsByTagName("tspan")).length; p4 < d4; p4++)
                      p4 ? x2(f4[p4], { dy: 1.2 * l5, x: s4.x }) : x2(f4[0], { dy: 0 });
                  x2(o5, { x: s4.x, y: s4.y }), i6._.dirty = 1;
                  var g4 = i6._getBBox(), v4 = s4.y - (g4.y + g4.height / 2);
                  v4 && t4.is(v4, "finite") && x2(f4[0], { dy: v4 });
                }
              }, C2 = function(t5) {
                return t5.parentNode && "a" === t5.parentNode.tagName.toLowerCase() ? t5.parentNode : t5;
              }, S = function(e5, r6) {
                this[0] = this.node = e5, e5.raphael = true, this.id = ("0000" + (Math.random() * Math.pow(36, 5) << 0).toString(36)).slice(-5), e5.raphaelid = this.id, this.matrix = t4.matrix(), this.realPath = null, this.paper = r6, this.attrs = this.attrs || {}, this._ = { transform: [], sx: 1, sy: 1, deg: 0, dx: 0, dy: 0, dirty: 1 }, !r6.bottom && (r6.bottom = this), this.prev = r6.top, r6.top && (r6.top.next = this), r6.top = this, this.next = null;
              }, T2 = t4.el;
              S.prototype = T2, T2.constructor = S, t4._engine.path = function(t5, e5) {
                var r6 = x2("path");
                e5.canvas && e5.canvas.appendChild(r6);
                var i6 = new S(r6, e5);
                return i6.type = "path", k3(i6, { fill: "none", stroke: "#000", path: t5 }), i6;
              }, T2.rotate = function(t5, e5, n4) {
                if (this.removed)
                  return this;
                if ((t5 = r5(t5).split(h2)).length - 1 && (e5 = i5(t5[1]), n4 = i5(t5[2])), t5 = i5(t5[0]), null == n4 && (e5 = n4), null == e5 || null == n4) {
                  var a5 = this.getBBox(1);
                  e5 = a5.x + a5.width / 2, n4 = a5.y + a5.height / 2;
                }
                return this.transform(this._.transform.concat([["r", t5, e5, n4]])), this;
              }, T2.scale = function(t5, e5, n4, a5) {
                if (this.removed)
                  return this;
                if ((t5 = r5(t5).split(h2)).length - 1 && (e5 = i5(t5[1]), n4 = i5(t5[2]), a5 = i5(t5[3])), t5 = i5(t5[0]), null == e5 && (e5 = t5), null == a5 && (n4 = a5), null == n4 || null == a5)
                  var s4 = this.getBBox(1);
                return n4 = null == n4 ? s4.x + s4.width / 2 : n4, a5 = null == a5 ? s4.y + s4.height / 2 : a5, this.transform(this._.transform.concat([["s", t5, e5, n4, a5]])), this;
              }, T2.translate = function(t5, e5) {
                return this.removed ? this : ((t5 = r5(t5).split(h2)).length - 1 && (e5 = i5(t5[1])), t5 = i5(t5[0]) || 0, e5 = +e5 || 0, this.transform(this._.transform.concat([["t", t5, e5]])), this);
              }, T2.transform = function(r6) {
                var i6 = this._;
                if (null == r6)
                  return i6.transform;
                if (t4._extractTransform(this, r6), this.clip && x2(this.clip, { transform: this.matrix.invert() }), this.pattern && m3(this), this.node && x2(this.node, { transform: this.matrix }), 1 != i6.sx || 1 != i6.sy) {
                  var n4 = this.attrs[e4]("stroke-width") ? this.attrs["stroke-width"] : 1;
                  this.attr({ "stroke-width": n4 });
                }
                return this;
              }, T2.hide = function() {
                return this.removed || (this.node.style.display = "none"), this;
              }, T2.show = function() {
                return this.removed || (this.node.style.display = ""), this;
              }, T2.remove = function() {
                var e5 = C2(this.node);
                if (!this.removed && e5.parentNode) {
                  var r6 = this.paper;
                  for (var i6 in r6.__set__ && r6.__set__.exclude(this), u4.unbind("raphael.*.*." + this.id), this.gradient && r6.defs.removeChild(this.gradient), t4._tear(this, r6), e5.parentNode.removeChild(e5), this.removeData(), this)
                    this[i6] = "function" == typeof this[i6] ? t4._removedFactory(i6) : null;
                  this.removed = true;
                }
              }, T2._getBBox = function() {
                if ("none" == this.node.style.display) {
                  this.show();
                  var t5 = true;
                }
                var e5, r6 = false;
                this.paper.canvas.parentElement ? e5 = this.paper.canvas.parentElement.style : this.paper.canvas.parentNode && (e5 = this.paper.canvas.parentNode.style), e5 && "none" == e5.display && (r6 = true, e5.display = "");
                var i6 = {};
                try {
                  i6 = this.node.getBBox();
                } catch (t6) {
                  i6 = { x: this.node.clientLeft, y: this.node.clientTop, width: this.node.clientWidth, height: this.node.clientHeight };
                } finally {
                  i6 = i6 || {}, r6 && (e5.display = "none");
                }
                return t5 && this.hide(), i6;
              }, T2.attr = function(r6, i6) {
                if (this.removed)
                  return this;
                if (null == r6) {
                  var n4 = {};
                  for (var a5 in this.attrs)
                    this.attrs[e4](a5) && (n4[a5] = this.attrs[a5]);
                  return n4.gradient && "none" == n4.fill && (n4.fill = n4.gradient) && delete n4.gradient, n4.transform = this._.transform, n4;
                }
                if (null == i6 && t4.is(r6, "string")) {
                  if ("fill" == r6 && "none" == this.attrs.fill && this.attrs.gradient)
                    return this.attrs.gradient;
                  if ("transform" == r6)
                    return this._.transform;
                  for (var s4 = r6.split(h2), o5 = {}, l5 = 0, c5 = s4.length; l5 < c5; l5++)
                    (r6 = s4[l5]) in this.attrs ? o5[r6] = this.attrs[r6] : t4.is(this.paper.customAttributes[r6], "function") ? o5[r6] = this.paper.customAttributes[r6].def : o5[r6] = t4._availableAttrs[r6];
                  return c5 - 1 ? o5 : o5[s4[0]];
                }
                if (null == i6 && t4.is(r6, "array")) {
                  for (o5 = {}, l5 = 0, c5 = r6.length; l5 < c5; l5++)
                    o5[r6[l5]] = this.attr(r6[l5]);
                  return o5;
                }
                if (null != i6) {
                  var f4 = {};
                  f4[r6] = i6;
                } else
                  null != r6 && t4.is(r6, "object") && (f4 = r6);
                for (var p4 in f4)
                  u4("raphael.attr." + p4 + "." + this.id, this, f4[p4]);
                for (p4 in this.paper.customAttributes)
                  if (this.paper.customAttributes[e4](p4) && f4[e4](p4) && t4.is(this.paper.customAttributes[p4], "function")) {
                    var d4 = this.paper.customAttributes[p4].apply(this, [].concat(f4[p4]));
                    for (var g4 in this.attrs[p4] = f4[p4], d4)
                      d4[e4](g4) && (f4[g4] = d4[g4]);
                  }
                return k3(this, f4), this;
              }, T2.toFront = function() {
                if (this.removed)
                  return this;
                var e5 = C2(this.node);
                e5.parentNode.appendChild(e5);
                var r6 = this.paper;
                return r6.top != this && t4._tofront(this, r6), this;
              }, T2.toBack = function() {
                if (this.removed)
                  return this;
                var e5 = C2(this.node), r6 = e5.parentNode;
                r6.insertBefore(e5, r6.firstChild), t4._toback(this, this.paper);
                this.paper;
                return this;
              }, T2.insertAfter = function(e5) {
                if (this.removed || !e5)
                  return this;
                var r6 = C2(this.node), i6 = C2(e5.node || e5[e5.length - 1].node);
                return i6.nextSibling ? i6.parentNode.insertBefore(r6, i6.nextSibling) : i6.parentNode.appendChild(r6), t4._insertafter(this, e5, this.paper), this;
              }, T2.insertBefore = function(e5) {
                if (this.removed || !e5)
                  return this;
                var r6 = C2(this.node), i6 = C2(e5.node || e5[0].node);
                return i6.parentNode.insertBefore(r6, i6), t4._insertbefore(this, e5, this.paper), this;
              }, T2.blur = function(e5) {
                var r6 = this;
                if (0 != +e5) {
                  var i6 = x2("filter"), n4 = x2("feGaussianBlur");
                  r6.attrs.blur = e5, i6.id = t4.createUUID(), x2(n4, { stdDeviation: +e5 || 1.5 }), i6.appendChild(n4), r6.paper.defs.appendChild(i6), r6._blur = i6, x2(r6.node, { filter: "url(#" + i6.id + ")" });
                } else
                  r6._blur && (r6._blur.parentNode.removeChild(r6._blur), delete r6._blur, delete r6.attrs.blur), r6.node.removeAttribute("filter");
                return r6;
              }, t4._engine.circle = function(t5, e5, r6, i6) {
                var n4 = x2("circle");
                t5.canvas && t5.canvas.appendChild(n4);
                var a5 = new S(n4, t5);
                return a5.attrs = { cx: e5, cy: r6, r: i6, fill: "none", stroke: "#000" }, a5.type = "circle", x2(n4, a5.attrs), a5;
              }, t4._engine.rect = function(t5, e5, r6, i6, n4, a5) {
                var s4 = x2("rect");
                t5.canvas && t5.canvas.appendChild(s4);
                var o5 = new S(s4, t5);
                return o5.attrs = { x: e5, y: r6, width: i6, height: n4, rx: a5 || 0, ry: a5 || 0, fill: "none", stroke: "#000" }, o5.type = "rect", x2(s4, o5.attrs), o5;
              }, t4._engine.ellipse = function(t5, e5, r6, i6, n4) {
                var a5 = x2("ellipse");
                t5.canvas && t5.canvas.appendChild(a5);
                var s4 = new S(a5, t5);
                return s4.attrs = { cx: e5, cy: r6, rx: i6, ry: n4, fill: "none", stroke: "#000" }, s4.type = "ellipse", x2(a5, s4.attrs), s4;
              }, t4._engine.image = function(t5, e5, r6, i6, n4, a5) {
                var s4 = x2("image");
                x2(s4, { x: r6, y: i6, width: n4, height: a5, preserveAspectRatio: "none" }), s4.setAttributeNS(p3, "href", e5), t5.canvas && t5.canvas.appendChild(s4);
                var o5 = new S(s4, t5);
                return o5.attrs = { x: r6, y: i6, width: n4, height: a5, src: e5 }, o5.type = "image", o5;
              }, t4._engine.text = function(e5, r6, i6, n4) {
                var a5 = x2("text");
                e5.canvas && e5.canvas.appendChild(a5);
                var s4 = new S(a5, e5);
                return s4.attrs = { x: r6, y: i6, "text-anchor": "middle", text: n4, "font-family": t4._availableAttrs["font-family"], "font-size": t4._availableAttrs["font-size"], stroke: "none", fill: "#000" }, s4.type = "text", k3(s4, s4.attrs), s4;
              }, t4._engine.setSize = function(t5, e5) {
                return this.width = t5 || this.width, this.height = e5 || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), this;
              }, t4._engine.create = function() {
                var e5 = t4._getContainer.apply(0, arguments), r6 = e5 && e5.container;
                if (!r6)
                  throw new Error("SVG container not found.");
                var i6, n4 = e5.x, a5 = e5.y, s4 = e5.width, o5 = e5.height, l5 = x2("svg"), h3 = "overflow:hidden;";
                return n4 = n4 || 0, a5 = a5 || 0, x2(l5, { height: o5 = o5 || 342, version: 1.1, width: s4 = s4 || 512, xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }), 1 == r6 ? (l5.style.cssText = h3 + "position:absolute;left:" + n4 + "px;top:" + a5 + "px", t4._g.doc.body.appendChild(l5), i6 = 1) : (l5.style.cssText = h3 + "position:relative", r6.firstChild ? r6.insertBefore(l5, r6.firstChild) : r6.appendChild(l5)), (r6 = new t4._Paper()).width = s4, r6.height = o5, r6.canvas = l5, r6.clear(), r6._left = r6._top = 0, i6 && (r6.renderfix = function() {
                }), r6.renderfix(), r6;
              }, t4._engine.setViewBox = function(t5, e5, r6, i6, n4) {
                u4("raphael.setViewBox", this, this._viewBox, [t5, e5, r6, i6, n4]);
                var a5, o5, l5 = this.getSize(), h3 = s3(r6 / l5.width, i6 / l5.height), c5 = this.top, p4 = n4 ? "xMidYMid meet" : "xMinYMin";
                for (null == t5 ? (this._vbSize && (h3 = 1), delete this._vbSize, a5 = "0 0 " + this.width + f3 + this.height) : (this._vbSize = h3, a5 = t5 + f3 + e5 + f3 + r6 + f3 + i6), x2(this.canvas, { viewBox: a5, preserveAspectRatio: p4 }); h3 && c5; )
                  o5 = "stroke-width" in c5.attrs ? c5.attrs["stroke-width"] : 1, c5.attr({ "stroke-width": o5 }), c5._.dirty = 1, c5._.dirtyT = 1, c5 = c5.prev;
                return this._viewBox = [t5, e5, r6, i6, !!n4], this;
              }, t4.prototype.renderfix = function() {
                var t5, e5 = this.canvas, r6 = e5.style;
                try {
                  t5 = e5.getScreenCTM() || e5.createSVGMatrix();
                } catch (r7) {
                  t5 = e5.createSVGMatrix();
                }
                var i6 = -t5.e % 1, n4 = -t5.f % 1;
                (i6 || n4) && (i6 && (this._left = (this._left + i6) % 1, r6.left = this._left + "px"), n4 && (this._top = (this._top + n4) % 1, r6.top = this._top + "px"));
              }, t4.prototype.clear = function() {
                t4.eve("raphael.clear", this);
                for (var e5 = this.canvas; e5.firstChild; )
                  e5.removeChild(e5.firstChild);
                this.bottom = this.top = null, (this.desc = x2("desc")).appendChild(t4._g.doc.createTextNode("Created with Rapha\xEBl " + t4.version)), e5.appendChild(this.desc), e5.appendChild(this.defs = x2("defs"));
              }, t4.prototype.remove = function() {
                for (var e5 in u4("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas), this)
                  this[e5] = "function" == typeof this[e5] ? t4._removedFactory(e5) : null;
              };
              var A2 = t4.st;
              for (var M2 in T2)
                T2[e4](M2) && !A2[e4](M2) && (A2[M2] = function(t5) {
                  return function() {
                    var e5 = arguments;
                    return this.forEach(function(r6) {
                      r6[t5].apply(r6, e5);
                    });
                  };
                }(M2));
            }
          }.apply(e3, i4)) || (t3.exports = n2);
        }, function(t3, e3, r4) {
          var i4, n2;
          i4 = [r4(0)], void 0 === (n2 = function(t4) {
            if (!t4 || t4.vml) {
              var e4 = "hasOwnProperty", r5 = String, i5 = parseFloat, n3 = Math, a4 = n3.round, s3 = n3.max, o4 = n3.min, l4 = n3.abs, h2 = /[, ]+/, u4 = t4.eve, c4 = " ", f3 = "", p3 = { M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x" }, d3 = /([clmz]),?([^clmz]*)/gi, g3 = / progid:\S+Blur\([^\)]+\)/g, x2 = /-?[^,\s-]+/g, v3 = "position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)", y2 = 21600, m3 = { path: 1, rect: 1, image: 1 }, b3 = { circle: 1, ellipse: 1 }, _3 = function(e5, r6, i6) {
                var n4 = t4.matrix();
                return n4.rotate(-e5, 0.5, 0.5), { dx: n4.x(r6, i6), dy: n4.y(r6, i6) };
              }, w3 = function(t5, e5, r6, i6, n4, a5) {
                var s4 = t5._, o5 = t5.matrix, h3 = s4.fillpos, u5 = t5.node, f4 = u5.style, p4 = 1, d4 = "", g4 = y2 / e5, x3 = y2 / r6;
                if (f4.visibility = "hidden", e5 && r6) {
                  if (u5.coordsize = l4(g4) + c4 + l4(x3), f4.rotation = a5 * (e5 * r6 < 0 ? -1 : 1), a5) {
                    var v4 = _3(a5, i6, n4);
                    i6 = v4.dx, n4 = v4.dy;
                  }
                  if (e5 < 0 && (d4 += "x"), r6 < 0 && (d4 += " y") && (p4 = -1), f4.flip = d4, u5.coordorigin = i6 * -g4 + c4 + n4 * -x3, h3 || s4.fillsize) {
                    var m4 = u5.getElementsByTagName("fill");
                    m4 = m4 && m4[0], u5.removeChild(m4), h3 && (v4 = _3(a5, o5.x(h3[0], h3[1]), o5.y(h3[0], h3[1])), m4.position = v4.dx * p4 + c4 + v4.dy * p4), s4.fillsize && (m4.size = s4.fillsize[0] * l4(e5) + c4 + s4.fillsize[1] * l4(r6)), u5.appendChild(m4);
                  }
                  f4.visibility = "visible";
                }
              };
              t4.toString = function() {
                return "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xEBl " + this.version;
              };
              var k3, B2 = function(t5, e5, i6) {
                for (var n4 = r5(e5).toLowerCase().split("-"), a5 = i6 ? "end" : "start", s4 = n4.length, o5 = "classic", l5 = "medium", h3 = "medium"; s4--; )
                  switch (n4[s4]) {
                    case "block":
                    case "classic":
                    case "oval":
                    case "diamond":
                    case "open":
                    case "none":
                      o5 = n4[s4];
                      break;
                    case "wide":
                    case "narrow":
                      h3 = n4[s4];
                      break;
                    case "long":
                    case "short":
                      l5 = n4[s4];
                  }
                var u5 = t5.node.getElementsByTagName("stroke")[0];
                u5[a5 + "arrow"] = o5, u5[a5 + "arrowlength"] = l5, u5[a5 + "arrowwidth"] = h3;
              }, C2 = function(n4, l5) {
                n4.attrs = n4.attrs || {};
                var u5 = n4.node, g4 = n4.attrs, v4 = u5.style, _4 = m3[n4.type] && (l5.x != g4.x || l5.y != g4.y || l5.width != g4.width || l5.height != g4.height || l5.cx != g4.cx || l5.cy != g4.cy || l5.rx != g4.rx || l5.ry != g4.ry || l5.r != g4.r), C3 = b3[n4.type] && (g4.cx != l5.cx || g4.cy != l5.cy || g4.r != l5.r || g4.rx != l5.rx || g4.ry != l5.ry), T3 = n4;
                for (var A3 in l5)
                  l5[e4](A3) && (g4[A3] = l5[A3]);
                if (_4 && (g4.path = t4._getPath[n4.type](n4), n4._.dirty = 1), l5.href && (u5.href = l5.href), l5.title && (u5.title = l5.title), l5.target && (u5.target = l5.target), l5.cursor && (v4.cursor = l5.cursor), "blur" in l5 && n4.blur(l5.blur), (l5.path && "path" == n4.type || _4) && (u5.path = function(e5) {
                  var i6 = /[ahqstv]/gi, n5 = t4._pathToAbsolute;
                  if (r5(e5).match(i6) && (n5 = t4._path2curve), i6 = /[clmz]/g, n5 == t4._pathToAbsolute && !r5(e5).match(i6)) {
                    var s4 = r5(e5).replace(d3, function(t5, e6, r6) {
                      var i7 = [], n6 = "m" == e6.toLowerCase(), s5 = p3[e6];
                      return r6.replace(x2, function(t6) {
                        n6 && 2 == i7.length && (s5 += i7 + p3["m" == e6 ? "l" : "L"], i7 = []), i7.push(a4(t6 * y2));
                      }), s5 + i7;
                    });
                    return s4;
                  }
                  var o5, l6, h3 = n5(e5);
                  s4 = [];
                  for (var u6 = 0, g5 = h3.length; u6 < g5; u6++) {
                    o5 = h3[u6], "z" == (l6 = h3[u6][0].toLowerCase()) && (l6 = "x");
                    for (var v5 = 1, m4 = o5.length; v5 < m4; v5++)
                      l6 += a4(o5[v5] * y2) + (v5 != m4 - 1 ? "," : f3);
                    s4.push(l6);
                  }
                  return s4.join(c4);
                }(~r5(g4.path).toLowerCase().indexOf("r") ? t4._pathToAbsolute(g4.path) : g4.path), n4._.dirty = 1, "image" == n4.type && (n4._.fillpos = [g4.x, g4.y], n4._.fillsize = [g4.width, g4.height], w3(n4, 1, 1, 0, 0, 0))), "transform" in l5 && n4.transform(l5.transform), C3) {
                  var M3 = +g4.cx, E3 = +g4.cy, N2 = +g4.rx || +g4.r || 0, L2 = +g4.ry || +g4.r || 0;
                  u5.path = t4.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", a4((M3 - N2) * y2), a4((E3 - L2) * y2), a4((M3 + N2) * y2), a4((E3 + L2) * y2), a4(M3 * y2)), n4._.dirty = 1;
                }
                if ("clip-rect" in l5) {
                  var P2 = r5(l5["clip-rect"]).split(h2);
                  if (4 == P2.length) {
                    P2[2] = +P2[2] + +P2[0], P2[3] = +P2[3] + +P2[1];
                    var z3 = u5.clipRect || t4._g.doc.createElement("div"), F3 = z3.style;
                    F3.clip = t4.format("rect({1}px {2}px {3}px {0}px)", P2), u5.clipRect || (F3.position = "absolute", F3.top = 0, F3.left = 0, F3.width = n4.paper.width + "px", F3.height = n4.paper.height + "px", u5.parentNode.insertBefore(z3, u5), z3.appendChild(u5), u5.clipRect = z3);
                  }
                  l5["clip-rect"] || u5.clipRect && (u5.clipRect.style.clip = "auto");
                }
                if (n4.textpath) {
                  var R = n4.textpath.style;
                  l5.font && (R.font = l5.font), l5["font-family"] && (R.fontFamily = '"' + l5["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, f3) + '"'), l5["font-size"] && (R.fontSize = l5["font-size"]), l5["font-weight"] && (R.fontWeight = l5["font-weight"]), l5["font-style"] && (R.fontStyle = l5["font-style"]);
                }
                if ("arrow-start" in l5 && B2(T3, l5["arrow-start"]), "arrow-end" in l5 && B2(T3, l5["arrow-end"], 1), null != l5.opacity || null != l5.fill || null != l5.src || null != l5.stroke || null != l5["stroke-width"] || null != l5["stroke-opacity"] || null != l5["fill-opacity"] || null != l5["stroke-dasharray"] || null != l5["stroke-miterlimit"] || null != l5["stroke-linejoin"] || null != l5["stroke-linecap"]) {
                  var j3 = u5.getElementsByTagName("fill");
                  if (!(j3 = j3 && j3[0]) && (j3 = k3("fill")), "image" == n4.type && l5.src && (j3.src = l5.src), l5.fill && (j3.on = true), null != j3.on && "none" != l5.fill && null !== l5.fill || (j3.on = false), j3.on && l5.fill) {
                    var I2 = r5(l5.fill).match(t4._ISURL);
                    if (I2) {
                      j3.parentNode == u5 && u5.removeChild(j3), j3.rotate = true, j3.src = I2[1], j3.type = "tile";
                      var D2 = n4.getBBox(1);
                      j3.position = D2.x + c4 + D2.y, n4._.fillpos = [D2.x, D2.y], t4._preload(I2[1], function() {
                        n4._.fillsize = [this.offsetWidth, this.offsetHeight];
                      });
                    } else
                      j3.color = t4.getRGB(l5.fill).hex, j3.src = f3, j3.type = "solid", t4.getRGB(l5.fill).error && (T3.type in { circle: 1, ellipse: 1 } || "r" != r5(l5.fill).charAt()) && S(T3, l5.fill, j3) && (g4.fill = "none", g4.gradient = l5.fill, j3.rotate = false);
                  }
                  if ("fill-opacity" in l5 || "opacity" in l5) {
                    var q2 = ((+g4["fill-opacity"] + 1 || 2) - 1) * ((+g4.opacity + 1 || 2) - 1) * ((+t4.getRGB(l5.fill).o + 1 || 2) - 1);
                    q2 = o4(s3(q2, 0), 1), j3.opacity = q2, j3.src && (j3.color = "none");
                  }
                  u5.appendChild(j3);
                  var O2 = u5.getElementsByTagName("stroke") && u5.getElementsByTagName("stroke")[0], V = false;
                  !O2 && (V = O2 = k3("stroke")), (l5.stroke && "none" != l5.stroke || l5["stroke-width"] || null != l5["stroke-opacity"] || l5["stroke-dasharray"] || l5["stroke-miterlimit"] || l5["stroke-linejoin"] || l5["stroke-linecap"]) && (O2.on = true), ("none" == l5.stroke || null === l5.stroke || null == O2.on || 0 == l5.stroke || 0 == l5["stroke-width"]) && (O2.on = false);
                  var W = t4.getRGB(l5.stroke);
                  O2.on && l5.stroke && (O2.color = W.hex), q2 = ((+g4["stroke-opacity"] + 1 || 2) - 1) * ((+g4.opacity + 1 || 2) - 1) * ((+W.o + 1 || 2) - 1);
                  var Y = 0.75 * (i5(l5["stroke-width"]) || 1);
                  if (q2 = o4(s3(q2, 0), 1), null == l5["stroke-width"] && (Y = g4["stroke-width"]), l5["stroke-width"] && (O2.weight = Y), Y && Y < 1 && (q2 *= Y) && (O2.weight = 1), O2.opacity = q2, l5["stroke-linejoin"] && (O2.joinstyle = l5["stroke-linejoin"] || "miter"), O2.miterlimit = l5["stroke-miterlimit"] || 8, l5["stroke-linecap"] && (O2.endcap = "butt" == l5["stroke-linecap"] ? "flat" : "square" == l5["stroke-linecap"] ? "square" : "round"), "stroke-dasharray" in l5) {
                    var G = { "-": "shortdash", ".": "shortdot", "-.": "shortdashdot", "-..": "shortdashdotdot", ". ": "dot", "- ": "dash", "--": "longdash", "- .": "dashdot", "--.": "longdashdot", "--..": "longdashdotdot" };
                    O2.dashstyle = G[e4](l5["stroke-dasharray"]) ? G[l5["stroke-dasharray"]] : f3;
                  }
                  V && u5.appendChild(O2);
                }
                if ("text" == T3.type) {
                  T3.paper.canvas.style.display = f3;
                  var H2 = T3.paper.span, X = g4.font && g4.font.match(/\d+(?:\.\d*)?(?=px)/);
                  v4 = H2.style, g4.font && (v4.font = g4.font), g4["font-family"] && (v4.fontFamily = g4["font-family"]), g4["font-weight"] && (v4.fontWeight = g4["font-weight"]), g4["font-style"] && (v4.fontStyle = g4["font-style"]), X = i5(g4["font-size"] || X && X[0]) || 10, v4.fontSize = 100 * X + "px", T3.textpath.string && (H2.innerHTML = r5(T3.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                  var U = H2.getBoundingClientRect();
                  T3.W = g4.w = (U.right - U.left) / 100, T3.H = g4.h = (U.bottom - U.top) / 100, T3.X = g4.x, T3.Y = g4.y + T3.H / 2, ("x" in l5 || "y" in l5) && (T3.path.v = t4.format("m{0},{1}l{2},{1}", a4(g4.x * y2), a4(g4.y * y2), a4(g4.x * y2) + 1));
                  for (var $2 = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"], Z = 0, Q = $2.length; Z < Q; Z++)
                    if ($2[Z] in l5) {
                      T3._.dirty = 1;
                      break;
                    }
                  switch (g4["text-anchor"]) {
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
              }, S = function(e5, a5, s4) {
                e5.attrs = e5.attrs || {};
                e5.attrs;
                var o5 = Math.pow, l5 = "linear", h3 = ".5 .5";
                if (e5.attrs.gradient = a5, a5 = (a5 = r5(a5).replace(t4._radial_gradient, function(t5, e6, r6) {
                  return l5 = "radial", e6 && r6 && (e6 = i5(e6), r6 = i5(r6), o5(e6 - 0.5, 2) + o5(r6 - 0.5, 2) > 0.25 && (r6 = n3.sqrt(0.25 - o5(e6 - 0.5, 2)) * (2 * (r6 > 0.5) - 1) + 0.5), h3 = e6 + c4 + r6), f3;
                })).split(/\s*\-\s*/), "linear" == l5) {
                  var u5 = a5.shift();
                  if (u5 = -i5(u5), isNaN(u5))
                    return null;
                }
                var p4 = t4._parseDots(a5);
                if (!p4)
                  return null;
                if (e5 = e5.shape || e5.node, p4.length) {
                  e5.removeChild(s4), s4.on = true, s4.method = "none", s4.color = p4[0].color, s4.color2 = p4[p4.length - 1].color;
                  for (var d4 = [], g4 = 0, x3 = p4.length; g4 < x3; g4++)
                    p4[g4].offset && d4.push(p4[g4].offset + c4 + p4[g4].color);
                  s4.colors = d4.length ? d4.join() : "0% " + s4.color, "radial" == l5 ? (s4.type = "gradientTitle", s4.focus = "100%", s4.focussize = "0 0", s4.focusposition = h3, s4.angle = 0) : (s4.type = "gradient", s4.angle = (270 - u5) % 360), e5.appendChild(s4);
                }
                return 1;
              }, T2 = function(e5, r6) {
                this[0] = this.node = e5, e5.raphael = true, this.id = t4._oid++, e5.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = r6, this.matrix = t4.matrix(), this._ = { transform: [], sx: 1, sy: 1, dx: 0, dy: 0, deg: 0, dirty: 1, dirtyT: 1 }, !r6.bottom && (r6.bottom = this), this.prev = r6.top, r6.top && (r6.top.next = this), r6.top = this, this.next = null;
              }, A2 = t4.el;
              T2.prototype = A2, A2.constructor = T2, A2.transform = function(e5) {
                if (null == e5)
                  return this._.transform;
                var i6, n4 = this.paper._viewBoxShift, a5 = n4 ? "s" + [n4.scale, n4.scale] + "-1-1t" + [n4.dx, n4.dy] : f3;
                n4 && (i6 = e5 = r5(e5).replace(/\.{3}|\u2026/g, this._.transform || f3)), t4._extractTransform(this, a5 + e5);
                var s4, o5 = this.matrix.clone(), l5 = this.skew, h3 = this.node, u5 = ~r5(this.attrs.fill).indexOf("-"), p4 = !r5(this.attrs.fill).indexOf("url(");
                if (o5.translate(1, 1), p4 || u5 || "image" == this.type)
                  if (l5.matrix = "1 0 0 1", l5.offset = "0 0", s4 = o5.split(), u5 && s4.noRotation || !s4.isSimple) {
                    h3.style.filter = o5.toFilter();
                    var d4 = this.getBBox(), g4 = this.getBBox(1), x3 = d4.x - g4.x, v4 = d4.y - g4.y;
                    h3.coordorigin = x3 * -y2 + c4 + v4 * -y2, w3(this, 1, 1, x3, v4, 0);
                  } else
                    h3.style.filter = f3, w3(this, s4.scalex, s4.scaley, s4.dx, s4.dy, s4.rotate);
                else
                  h3.style.filter = f3, l5.matrix = r5(o5), l5.offset = o5.offset();
                return null !== i6 && (this._.transform = i6, t4._extractTransform(this, i6)), this;
              }, A2.rotate = function(t5, e5, n4) {
                if (this.removed)
                  return this;
                if (null != t5) {
                  if ((t5 = r5(t5).split(h2)).length - 1 && (e5 = i5(t5[1]), n4 = i5(t5[2])), t5 = i5(t5[0]), null == n4 && (e5 = n4), null == e5 || null == n4) {
                    var a5 = this.getBBox(1);
                    e5 = a5.x + a5.width / 2, n4 = a5.y + a5.height / 2;
                  }
                  return this._.dirtyT = 1, this.transform(this._.transform.concat([["r", t5, e5, n4]])), this;
                }
              }, A2.translate = function(t5, e5) {
                return this.removed ? this : ((t5 = r5(t5).split(h2)).length - 1 && (e5 = i5(t5[1])), t5 = i5(t5[0]) || 0, e5 = +e5 || 0, this._.bbox && (this._.bbox.x += t5, this._.bbox.y += e5), this.transform(this._.transform.concat([["t", t5, e5]])), this);
              }, A2.scale = function(t5, e5, n4, a5) {
                if (this.removed)
                  return this;
                if ((t5 = r5(t5).split(h2)).length - 1 && (e5 = i5(t5[1]), n4 = i5(t5[2]), a5 = i5(t5[3]), isNaN(n4) && (n4 = null), isNaN(a5) && (a5 = null)), t5 = i5(t5[0]), null == e5 && (e5 = t5), null == a5 && (n4 = a5), null == n4 || null == a5)
                  var s4 = this.getBBox(1);
                return n4 = null == n4 ? s4.x + s4.width / 2 : n4, a5 = null == a5 ? s4.y + s4.height / 2 : a5, this.transform(this._.transform.concat([["s", t5, e5, n4, a5]])), this._.dirtyT = 1, this;
              }, A2.hide = function() {
                return !this.removed && (this.node.style.display = "none"), this;
              }, A2.show = function() {
                return !this.removed && (this.node.style.display = f3), this;
              }, A2.auxGetBBox = t4.el.getBBox, A2.getBBox = function() {
                var t5 = this.auxGetBBox();
                if (this.paper && this.paper._viewBoxShift) {
                  var e5 = {}, r6 = 1 / this.paper._viewBoxShift.scale;
                  return e5.x = t5.x - this.paper._viewBoxShift.dx, e5.x *= r6, e5.y = t5.y - this.paper._viewBoxShift.dy, e5.y *= r6, e5.width = t5.width * r6, e5.height = t5.height * r6, e5.x2 = e5.x + e5.width, e5.y2 = e5.y + e5.height, e5;
                }
                return t5;
              }, A2._getBBox = function() {
                return this.removed ? {} : { x: this.X + (this.bbx || 0) - this.W / 2, y: this.Y - this.H, width: this.W, height: this.H };
              }, A2.remove = function() {
                if (!this.removed && this.node.parentNode) {
                  for (var e5 in this.paper.__set__ && this.paper.__set__.exclude(this), t4.eve.unbind("raphael.*.*." + this.id), t4._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape), this)
                    this[e5] = "function" == typeof this[e5] ? t4._removedFactory(e5) : null;
                  this.removed = true;
                }
              }, A2.attr = function(r6, i6) {
                if (this.removed)
                  return this;
                if (null == r6) {
                  var n4 = {};
                  for (var a5 in this.attrs)
                    this.attrs[e4](a5) && (n4[a5] = this.attrs[a5]);
                  return n4.gradient && "none" == n4.fill && (n4.fill = n4.gradient) && delete n4.gradient, n4.transform = this._.transform, n4;
                }
                if (null == i6 && t4.is(r6, "string")) {
                  if ("fill" == r6 && "none" == this.attrs.fill && this.attrs.gradient)
                    return this.attrs.gradient;
                  for (var s4 = r6.split(h2), o5 = {}, l5 = 0, c5 = s4.length; l5 < c5; l5++)
                    (r6 = s4[l5]) in this.attrs ? o5[r6] = this.attrs[r6] : t4.is(this.paper.customAttributes[r6], "function") ? o5[r6] = this.paper.customAttributes[r6].def : o5[r6] = t4._availableAttrs[r6];
                  return c5 - 1 ? o5 : o5[s4[0]];
                }
                if (this.attrs && null == i6 && t4.is(r6, "array")) {
                  for (o5 = {}, l5 = 0, c5 = r6.length; l5 < c5; l5++)
                    o5[r6[l5]] = this.attr(r6[l5]);
                  return o5;
                }
                var f4;
                for (var p4 in null != i6 && ((f4 = {})[r6] = i6), null == i6 && t4.is(r6, "object") && (f4 = r6), f4)
                  u4("raphael.attr." + p4 + "." + this.id, this, f4[p4]);
                if (f4) {
                  for (p4 in this.paper.customAttributes)
                    if (this.paper.customAttributes[e4](p4) && f4[e4](p4) && t4.is(this.paper.customAttributes[p4], "function")) {
                      var d4 = this.paper.customAttributes[p4].apply(this, [].concat(f4[p4]));
                      for (var g4 in this.attrs[p4] = f4[p4], d4)
                        d4[e4](g4) && (f4[g4] = d4[g4]);
                    }
                  f4.text && "text" == this.type && (this.textpath.string = f4.text), C2(this, f4);
                }
                return this;
              }, A2.toFront = function() {
                return !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && t4._tofront(this, this.paper), this;
              }, A2.toBack = function() {
                return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), t4._toback(this, this.paper)), this);
              }, A2.insertAfter = function(e5) {
                return this.removed ? this : (e5.constructor == t4.st.constructor && (e5 = e5[e5.length - 1]), e5.node.nextSibling ? e5.node.parentNode.insertBefore(this.node, e5.node.nextSibling) : e5.node.parentNode.appendChild(this.node), t4._insertafter(this, e5, this.paper), this);
              }, A2.insertBefore = function(e5) {
                return this.removed ? this : (e5.constructor == t4.st.constructor && (e5 = e5[0]), e5.node.parentNode.insertBefore(this.node, e5.node), t4._insertbefore(this, e5, this.paper), this);
              }, A2.blur = function(e5) {
                var r6 = this.node.runtimeStyle, i6 = r6.filter;
                return i6 = i6.replace(g3, f3), 0 != +e5 ? (this.attrs.blur = e5, r6.filter = i6 + c4 + " progid:DXImageTransform.Microsoft.Blur(pixelradius=" + (+e5 || 1.5) + ")", r6.margin = t4.format("-{0}px 0 0 -{0}px", a4(+e5 || 1.5))) : (r6.filter = i6, r6.margin = 0, delete this.attrs.blur), this;
              }, t4._engine.path = function(t5, e5) {
                var r6 = k3("shape");
                r6.style.cssText = v3, r6.coordsize = y2 + c4 + y2, r6.coordorigin = e5.coordorigin;
                var i6 = new T2(r6, e5), n4 = { fill: "none", stroke: "#000" };
                t5 && (n4.path = t5), i6.type = "path", i6.path = [], i6.Path = f3, C2(i6, n4), e5.canvas && e5.canvas.appendChild(r6);
                var a5 = k3("skew");
                return a5.on = true, r6.appendChild(a5), i6.skew = a5, i6.transform(f3), i6;
              }, t4._engine.rect = function(e5, r6, i6, n4, a5, s4) {
                var o5 = t4._rectPath(r6, i6, n4, a5, s4), l5 = e5.path(o5), h3 = l5.attrs;
                return l5.X = h3.x = r6, l5.Y = h3.y = i6, l5.W = h3.width = n4, l5.H = h3.height = a5, h3.r = s4, h3.path = o5, l5.type = "rect", l5;
              }, t4._engine.ellipse = function(t5, e5, r6, i6, n4) {
                var a5 = t5.path();
                a5.attrs;
                return a5.X = e5 - i6, a5.Y = r6 - n4, a5.W = 2 * i6, a5.H = 2 * n4, a5.type = "ellipse", C2(a5, { cx: e5, cy: r6, rx: i6, ry: n4 }), a5;
              }, t4._engine.circle = function(t5, e5, r6, i6) {
                var n4 = t5.path();
                n4.attrs;
                return n4.X = e5 - i6, n4.Y = r6 - i6, n4.W = n4.H = 2 * i6, n4.type = "circle", C2(n4, { cx: e5, cy: r6, r: i6 }), n4;
              }, t4._engine.image = function(e5, r6, i6, n4, a5, s4) {
                var o5 = t4._rectPath(i6, n4, a5, s4), l5 = e5.path(o5).attr({ stroke: "none" }), h3 = l5.attrs, u5 = l5.node, c5 = u5.getElementsByTagName("fill")[0];
                return h3.src = r6, l5.X = h3.x = i6, l5.Y = h3.y = n4, l5.W = h3.width = a5, l5.H = h3.height = s4, h3.path = o5, l5.type = "image", c5.parentNode == u5 && u5.removeChild(c5), c5.rotate = true, c5.src = r6, c5.type = "tile", l5._.fillpos = [i6, n4], l5._.fillsize = [a5, s4], u5.appendChild(c5), w3(l5, 1, 1, 0, 0, 0), l5;
              }, t4._engine.text = function(e5, i6, n4, s4) {
                var o5 = k3("shape"), l5 = k3("path"), h3 = k3("textpath");
                i6 = i6 || 0, n4 = n4 || 0, s4 = s4 || "", l5.v = t4.format("m{0},{1}l{2},{1}", a4(i6 * y2), a4(n4 * y2), a4(i6 * y2) + 1), l5.textpathok = true, h3.string = r5(s4), h3.on = true, o5.style.cssText = v3, o5.coordsize = y2 + c4 + y2, o5.coordorigin = "0 0";
                var u5 = new T2(o5, e5), p4 = { fill: "#000", stroke: "none", font: t4._availableAttrs.font, text: s4 };
                u5.shape = o5, u5.path = l5, u5.textpath = h3, u5.type = "text", u5.attrs.text = r5(s4), u5.attrs.x = i6, u5.attrs.y = n4, u5.attrs.w = 1, u5.attrs.h = 1, C2(u5, p4), o5.appendChild(h3), o5.appendChild(l5), e5.canvas.appendChild(o5);
                var d4 = k3("skew");
                return d4.on = true, o5.appendChild(d4), u5.skew = d4, u5.transform(f3), u5;
              }, t4._engine.setSize = function(e5, r6) {
                var i6 = this.canvas.style;
                return this.width = e5, this.height = r6, e5 == +e5 && (e5 += "px"), r6 == +r6 && (r6 += "px"), i6.width = e5, i6.height = r6, i6.clip = "rect(0 " + e5 + " " + r6 + " 0)", this._viewBox && t4._engine.setViewBox.apply(this, this._viewBox), this;
              }, t4._engine.setViewBox = function(e5, r6, i6, n4, a5) {
                t4.eve("raphael.setViewBox", this, this._viewBox, [e5, r6, i6, n4, a5]);
                var s4, o5, l5 = this.getSize(), h3 = l5.width, u5 = l5.height;
                return a5 && (i6 * (s4 = u5 / n4) < h3 && (e5 -= (h3 - i6 * s4) / 2 / s4), n4 * (o5 = h3 / i6) < u5 && (r6 -= (u5 - n4 * o5) / 2 / o5)), this._viewBox = [e5, r6, i6, n4, !!a5], this._viewBoxShift = { dx: -e5, dy: -r6, scale: l5 }, this.forEach(function(t5) {
                  t5.transform("...");
                }), this;
              }, t4._engine.initWin = function(t5) {
                var e5 = t5.document;
                e5.styleSheets.length < 31 ? e5.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)") : e5.styleSheets[0].addRule(".rvml", "behavior:url(#default#VML)");
                try {
                  !e5.namespaces.rvml && e5.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), k3 = function(t6) {
                    return e5.createElement("<rvml:" + t6 + ' class="rvml">');
                  };
                } catch (t6) {
                  k3 = function(t7) {
                    return e5.createElement("<" + t7 + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                  };
                }
              }, t4._engine.initWin(t4._g.win), t4._engine.create = function() {
                var e5 = t4._getContainer.apply(0, arguments), r6 = e5.container, i6 = e5.height, n4 = e5.width, a5 = e5.x, s4 = e5.y;
                if (!r6)
                  throw new Error("VML container not found.");
                var o5 = new t4._Paper(), l5 = o5.canvas = t4._g.doc.createElement("div"), h3 = l5.style;
                return a5 = a5 || 0, s4 = s4 || 0, n4 = n4 || 512, i6 = i6 || 342, o5.width = n4, o5.height = i6, n4 == +n4 && (n4 += "px"), i6 == +i6 && (i6 += "px"), o5.coordsize = 216e5 + c4 + 216e5, o5.coordorigin = "0 0", o5.span = t4._g.doc.createElement("span"), o5.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", l5.appendChild(o5.span), h3.cssText = t4.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", n4, i6), 1 == r6 ? (t4._g.doc.body.appendChild(l5), h3.left = a5 + "px", h3.top = s4 + "px", h3.position = "absolute") : r6.firstChild ? r6.insertBefore(l5, r6.firstChild) : r6.appendChild(l5), o5.renderfix = function() {
                }, o5;
              }, t4.prototype.clear = function() {
                t4.eve("raphael.clear", this), this.canvas.innerHTML = f3, this.span = t4._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null;
              }, t4.prototype.remove = function() {
                for (var e5 in t4.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas), this)
                  this[e5] = "function" == typeof this[e5] ? t4._removedFactory(e5) : null;
                return true;
              };
              var M2 = t4.st;
              for (var E2 in A2)
                A2[e4](E2) && !M2[e4](E2) && (M2[E2] = function(t5) {
                  return function() {
                    var e5 = arguments;
                    return this.forEach(function(r6) {
                      r6[t5].apply(r6, e5);
                    });
                  };
                }(E2));
            }
          }.apply(e3, i4)) || (t3.exports = n2);
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
            for (var i4 in parent2) {
              var attrs;
              if (proto) {
                attrs = Object.getOwnPropertyDescriptor(proto, i4);
              }
              if (attrs && attrs.set == null) {
                continue;
              }
              child[i4] = _clone(parent2[i4], depth2 - 1);
            }
            return child;
          }
          return _clone(parent, depth);
        }
        clone2.clonePrototype = function clonePrototype(parent) {
          if (parent === null)
            return null;
          var c4 = function() {
          };
          c4.prototype = parent;
          return new c4();
        };
        function __objToStr(o4) {
          return Object.prototype.toString.call(o4);
        }
        ;
        clone2.__objToStr = __objToStr;
        function __isDate(o4) {
          return typeof o4 === "object" && __objToStr(o4) === "[object Date]";
        }
        ;
        clone2.__isDate = __isDate;
        function __isArray(o4) {
          return typeof o4 === "object" && __objToStr(o4) === "[object Array]";
        }
        ;
        clone2.__isArray = __isArray;
        function __isRegExp(o4) {
          return typeof o4 === "object" && __objToStr(o4) === "[object RegExp]";
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
        var r4 = rgb[0] / 255;
        var g3 = rgb[1] / 255;
        var b3 = rgb[2] / 255;
        var min = Math.min(r4, g3, b3);
        var max = Math.max(r4, g3, b3);
        var delta = max - min;
        var h2;
        var s3;
        var l4;
        if (max === min) {
          h2 = 0;
        } else if (r4 === max) {
          h2 = (g3 - b3) / delta;
        } else if (g3 === max) {
          h2 = 2 + (b3 - r4) / delta;
        } else if (b3 === max) {
          h2 = 4 + (r4 - g3) / delta;
        }
        h2 = Math.min(h2 * 60, 360);
        if (h2 < 0) {
          h2 += 360;
        }
        l4 = (min + max) / 2;
        if (max === min) {
          s3 = 0;
        } else if (l4 <= 0.5) {
          s3 = delta / (max + min);
        } else {
          s3 = delta / (2 - max - min);
        }
        return [h2, s3 * 100, l4 * 100];
      };
      convert.rgb.hsv = function(rgb) {
        var rdif;
        var gdif;
        var bdif;
        var h2;
        var s3;
        var r4 = rgb[0] / 255;
        var g3 = rgb[1] / 255;
        var b3 = rgb[2] / 255;
        var v3 = Math.max(r4, g3, b3);
        var diff = v3 - Math.min(r4, g3, b3);
        var diffc = function(c4) {
          return (v3 - c4) / 6 / diff + 1 / 2;
        };
        if (diff === 0) {
          h2 = s3 = 0;
        } else {
          s3 = diff / v3;
          rdif = diffc(r4);
          gdif = diffc(g3);
          bdif = diffc(b3);
          if (r4 === v3) {
            h2 = bdif - gdif;
          } else if (g3 === v3) {
            h2 = 1 / 3 + rdif - bdif;
          } else if (b3 === v3) {
            h2 = 2 / 3 + gdif - rdif;
          }
          if (h2 < 0) {
            h2 += 1;
          } else if (h2 > 1) {
            h2 -= 1;
          }
        }
        return [
          h2 * 360,
          s3 * 100,
          v3 * 100
        ];
      };
      convert.rgb.hwb = function(rgb) {
        var r4 = rgb[0];
        var g3 = rgb[1];
        var b3 = rgb[2];
        var h2 = convert.rgb.hsl(rgb)[0];
        var w3 = 1 / 255 * Math.min(r4, Math.min(g3, b3));
        b3 = 1 - 1 / 255 * Math.max(r4, Math.max(g3, b3));
        return [h2, w3 * 100, b3 * 100];
      };
      convert.rgb.cmyk = function(rgb) {
        var r4 = rgb[0] / 255;
        var g3 = rgb[1] / 255;
        var b3 = rgb[2] / 255;
        var c4;
        var m3;
        var y2;
        var k3;
        k3 = Math.min(1 - r4, 1 - g3, 1 - b3);
        c4 = (1 - r4 - k3) / (1 - k3) || 0;
        m3 = (1 - g3 - k3) / (1 - k3) || 0;
        y2 = (1 - b3 - k3) / (1 - k3) || 0;
        return [c4 * 100, m3 * 100, y2 * 100, k3 * 100];
      };
      function comparativeDistance(x2, y2) {
        return Math.pow(x2[0] - y2[0], 2) + Math.pow(x2[1] - y2[1], 2) + Math.pow(x2[2] - y2[2], 2);
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
        var r4 = rgb[0] / 255;
        var g3 = rgb[1] / 255;
        var b3 = rgb[2] / 255;
        r4 = r4 > 0.04045 ? Math.pow((r4 + 0.055) / 1.055, 2.4) : r4 / 12.92;
        g3 = g3 > 0.04045 ? Math.pow((g3 + 0.055) / 1.055, 2.4) : g3 / 12.92;
        b3 = b3 > 0.04045 ? Math.pow((b3 + 0.055) / 1.055, 2.4) : b3 / 12.92;
        var x2 = r4 * 0.4124 + g3 * 0.3576 + b3 * 0.1805;
        var y2 = r4 * 0.2126 + g3 * 0.7152 + b3 * 0.0722;
        var z3 = r4 * 0.0193 + g3 * 0.1192 + b3 * 0.9505;
        return [x2 * 100, y2 * 100, z3 * 100];
      };
      convert.rgb.lab = function(rgb) {
        var xyz = convert.rgb.xyz(rgb);
        var x2 = xyz[0];
        var y2 = xyz[1];
        var z3 = xyz[2];
        var l4;
        var a4;
        var b3;
        x2 /= 95.047;
        y2 /= 100;
        z3 /= 108.883;
        x2 = x2 > 8856e-6 ? Math.pow(x2, 1 / 3) : 7.787 * x2 + 16 / 116;
        y2 = y2 > 8856e-6 ? Math.pow(y2, 1 / 3) : 7.787 * y2 + 16 / 116;
        z3 = z3 > 8856e-6 ? Math.pow(z3, 1 / 3) : 7.787 * z3 + 16 / 116;
        l4 = 116 * y2 - 16;
        a4 = 500 * (x2 - y2);
        b3 = 200 * (y2 - z3);
        return [l4, a4, b3];
      };
      convert.hsl.rgb = function(hsl) {
        var h2 = hsl[0] / 360;
        var s3 = hsl[1] / 100;
        var l4 = hsl[2] / 100;
        var t1;
        var t22;
        var t3;
        var rgb;
        var val;
        if (s3 === 0) {
          val = l4 * 255;
          return [val, val, val];
        }
        if (l4 < 0.5) {
          t22 = l4 * (1 + s3);
        } else {
          t22 = l4 + s3 - l4 * s3;
        }
        t1 = 2 * l4 - t22;
        rgb = [0, 0, 0];
        for (var i4 = 0; i4 < 3; i4++) {
          t3 = h2 + 1 / 3 * -(i4 - 1);
          if (t3 < 0) {
            t3++;
          }
          if (t3 > 1) {
            t3--;
          }
          if (6 * t3 < 1) {
            val = t1 + (t22 - t1) * 6 * t3;
          } else if (2 * t3 < 1) {
            val = t22;
          } else if (3 * t3 < 2) {
            val = t1 + (t22 - t1) * (2 / 3 - t3) * 6;
          } else {
            val = t1;
          }
          rgb[i4] = val * 255;
        }
        return rgb;
      };
      convert.hsl.hsv = function(hsl) {
        var h2 = hsl[0];
        var s3 = hsl[1] / 100;
        var l4 = hsl[2] / 100;
        var smin = s3;
        var lmin = Math.max(l4, 0.01);
        var sv;
        var v3;
        l4 *= 2;
        s3 *= l4 <= 1 ? l4 : 2 - l4;
        smin *= lmin <= 1 ? lmin : 2 - lmin;
        v3 = (l4 + s3) / 2;
        sv = l4 === 0 ? 2 * smin / (lmin + smin) : 2 * s3 / (l4 + s3);
        return [h2, sv * 100, v3 * 100];
      };
      convert.hsv.rgb = function(hsv) {
        var h2 = hsv[0] / 60;
        var s3 = hsv[1] / 100;
        var v3 = hsv[2] / 100;
        var hi = Math.floor(h2) % 6;
        var f3 = h2 - Math.floor(h2);
        var p3 = 255 * v3 * (1 - s3);
        var q2 = 255 * v3 * (1 - s3 * f3);
        var t3 = 255 * v3 * (1 - s3 * (1 - f3));
        v3 *= 255;
        switch (hi) {
          case 0:
            return [v3, t3, p3];
          case 1:
            return [q2, v3, p3];
          case 2:
            return [p3, v3, t3];
          case 3:
            return [p3, q2, v3];
          case 4:
            return [t3, p3, v3];
          case 5:
            return [v3, p3, q2];
        }
      };
      convert.hsv.hsl = function(hsv) {
        var h2 = hsv[0];
        var s3 = hsv[1] / 100;
        var v3 = hsv[2] / 100;
        var vmin = Math.max(v3, 0.01);
        var lmin;
        var sl;
        var l4;
        l4 = (2 - s3) * v3;
        lmin = (2 - s3) * vmin;
        sl = s3 * vmin;
        sl /= lmin <= 1 ? lmin : 2 - lmin;
        sl = sl || 0;
        l4 /= 2;
        return [h2, sl * 100, l4 * 100];
      };
      convert.hwb.rgb = function(hwb) {
        var h2 = hwb[0] / 360;
        var wh = hwb[1] / 100;
        var bl = hwb[2] / 100;
        var ratio = wh + bl;
        var i4;
        var v3;
        var f3;
        var n2;
        if (ratio > 1) {
          wh /= ratio;
          bl /= ratio;
        }
        i4 = Math.floor(6 * h2);
        v3 = 1 - bl;
        f3 = 6 * h2 - i4;
        if ((i4 & 1) !== 0) {
          f3 = 1 - f3;
        }
        n2 = wh + f3 * (v3 - wh);
        var r4;
        var g3;
        var b3;
        switch (i4) {
          default:
          case 6:
          case 0:
            r4 = v3;
            g3 = n2;
            b3 = wh;
            break;
          case 1:
            r4 = n2;
            g3 = v3;
            b3 = wh;
            break;
          case 2:
            r4 = wh;
            g3 = v3;
            b3 = n2;
            break;
          case 3:
            r4 = wh;
            g3 = n2;
            b3 = v3;
            break;
          case 4:
            r4 = n2;
            g3 = wh;
            b3 = v3;
            break;
          case 5:
            r4 = v3;
            g3 = wh;
            b3 = n2;
            break;
        }
        return [r4 * 255, g3 * 255, b3 * 255];
      };
      convert.cmyk.rgb = function(cmyk) {
        var c4 = cmyk[0] / 100;
        var m3 = cmyk[1] / 100;
        var y2 = cmyk[2] / 100;
        var k3 = cmyk[3] / 100;
        var r4;
        var g3;
        var b3;
        r4 = 1 - Math.min(1, c4 * (1 - k3) + k3);
        g3 = 1 - Math.min(1, m3 * (1 - k3) + k3);
        b3 = 1 - Math.min(1, y2 * (1 - k3) + k3);
        return [r4 * 255, g3 * 255, b3 * 255];
      };
      convert.xyz.rgb = function(xyz) {
        var x2 = xyz[0] / 100;
        var y2 = xyz[1] / 100;
        var z3 = xyz[2] / 100;
        var r4;
        var g3;
        var b3;
        r4 = x2 * 3.2406 + y2 * -1.5372 + z3 * -0.4986;
        g3 = x2 * -0.9689 + y2 * 1.8758 + z3 * 0.0415;
        b3 = x2 * 0.0557 + y2 * -0.204 + z3 * 1.057;
        r4 = r4 > 31308e-7 ? 1.055 * Math.pow(r4, 1 / 2.4) - 0.055 : r4 * 12.92;
        g3 = g3 > 31308e-7 ? 1.055 * Math.pow(g3, 1 / 2.4) - 0.055 : g3 * 12.92;
        b3 = b3 > 31308e-7 ? 1.055 * Math.pow(b3, 1 / 2.4) - 0.055 : b3 * 12.92;
        r4 = Math.min(Math.max(0, r4), 1);
        g3 = Math.min(Math.max(0, g3), 1);
        b3 = Math.min(Math.max(0, b3), 1);
        return [r4 * 255, g3 * 255, b3 * 255];
      };
      convert.xyz.lab = function(xyz) {
        var x2 = xyz[0];
        var y2 = xyz[1];
        var z3 = xyz[2];
        var l4;
        var a4;
        var b3;
        x2 /= 95.047;
        y2 /= 100;
        z3 /= 108.883;
        x2 = x2 > 8856e-6 ? Math.pow(x2, 1 / 3) : 7.787 * x2 + 16 / 116;
        y2 = y2 > 8856e-6 ? Math.pow(y2, 1 / 3) : 7.787 * y2 + 16 / 116;
        z3 = z3 > 8856e-6 ? Math.pow(z3, 1 / 3) : 7.787 * z3 + 16 / 116;
        l4 = 116 * y2 - 16;
        a4 = 500 * (x2 - y2);
        b3 = 200 * (y2 - z3);
        return [l4, a4, b3];
      };
      convert.lab.xyz = function(lab) {
        var l4 = lab[0];
        var a4 = lab[1];
        var b3 = lab[2];
        var x2;
        var y2;
        var z3;
        y2 = (l4 + 16) / 116;
        x2 = a4 / 500 + y2;
        z3 = y2 - b3 / 200;
        var y22 = Math.pow(y2, 3);
        var x22 = Math.pow(x2, 3);
        var z22 = Math.pow(z3, 3);
        y2 = y22 > 8856e-6 ? y22 : (y2 - 16 / 116) / 7.787;
        x2 = x22 > 8856e-6 ? x22 : (x2 - 16 / 116) / 7.787;
        z3 = z22 > 8856e-6 ? z22 : (z3 - 16 / 116) / 7.787;
        x2 *= 95.047;
        y2 *= 100;
        z3 *= 108.883;
        return [x2, y2, z3];
      };
      convert.lab.lch = function(lab) {
        var l4 = lab[0];
        var a4 = lab[1];
        var b3 = lab[2];
        var hr;
        var h2;
        var c4;
        hr = Math.atan2(b3, a4);
        h2 = hr * 360 / 2 / Math.PI;
        if (h2 < 0) {
          h2 += 360;
        }
        c4 = Math.sqrt(a4 * a4 + b3 * b3);
        return [l4, c4, h2];
      };
      convert.lch.lab = function(lch) {
        var l4 = lch[0];
        var c4 = lch[1];
        var h2 = lch[2];
        var a4;
        var b3;
        var hr;
        hr = h2 / 360 * 2 * Math.PI;
        a4 = c4 * Math.cos(hr);
        b3 = c4 * Math.sin(hr);
        return [l4, a4, b3];
      };
      convert.rgb.ansi16 = function(args) {
        var r4 = args[0];
        var g3 = args[1];
        var b3 = args[2];
        var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2];
        value = Math.round(value / 50);
        if (value === 0) {
          return 30;
        }
        var ansi = 30 + (Math.round(b3 / 255) << 2 | Math.round(g3 / 255) << 1 | Math.round(r4 / 255));
        if (value === 2) {
          ansi += 60;
        }
        return ansi;
      };
      convert.hsv.ansi16 = function(args) {
        return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
      };
      convert.rgb.ansi256 = function(args) {
        var r4 = args[0];
        var g3 = args[1];
        var b3 = args[2];
        if (r4 === g3 && g3 === b3) {
          if (r4 < 8) {
            return 16;
          }
          if (r4 > 248) {
            return 231;
          }
          return Math.round((r4 - 8) / 247 * 24) + 232;
        }
        var ansi = 16 + 36 * Math.round(r4 / 255 * 5) + 6 * Math.round(g3 / 255 * 5) + Math.round(b3 / 255 * 5);
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
        var r4 = (color & 1) * mult * 255;
        var g3 = (color >> 1 & 1) * mult * 255;
        var b3 = (color >> 2 & 1) * mult * 255;
        return [r4, g3, b3];
      };
      convert.ansi256.rgb = function(args) {
        if (args >= 232) {
          var c4 = (args - 232) * 10 + 8;
          return [c4, c4, c4];
        }
        args -= 16;
        var rem;
        var r4 = Math.floor(args / 36) / 5 * 255;
        var g3 = Math.floor((rem = args % 36) / 6) / 5 * 255;
        var b3 = rem % 6 / 5 * 255;
        return [r4, g3, b3];
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
        var r4 = integer >> 16 & 255;
        var g3 = integer >> 8 & 255;
        var b3 = integer & 255;
        return [r4, g3, b3];
      };
      convert.rgb.hcg = function(rgb) {
        var r4 = rgb[0] / 255;
        var g3 = rgb[1] / 255;
        var b3 = rgb[2] / 255;
        var max = Math.max(Math.max(r4, g3), b3);
        var min = Math.min(Math.min(r4, g3), b3);
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
        } else if (max === r4) {
          hue = (g3 - b3) / chroma % 6;
        } else if (max === g3) {
          hue = 2 + (b3 - r4) / chroma;
        } else {
          hue = 4 + (r4 - g3) / chroma + 4;
        }
        hue /= 6;
        hue %= 1;
        return [hue * 360, chroma * 100, grayscale * 100];
      };
      convert.hsl.hcg = function(hsl) {
        var s3 = hsl[1] / 100;
        var l4 = hsl[2] / 100;
        var c4 = 1;
        var f3 = 0;
        if (l4 < 0.5) {
          c4 = 2 * s3 * l4;
        } else {
          c4 = 2 * s3 * (1 - l4);
        }
        if (c4 < 1) {
          f3 = (l4 - 0.5 * c4) / (1 - c4);
        }
        return [hsl[0], c4 * 100, f3 * 100];
      };
      convert.hsv.hcg = function(hsv) {
        var s3 = hsv[1] / 100;
        var v3 = hsv[2] / 100;
        var c4 = s3 * v3;
        var f3 = 0;
        if (c4 < 1) {
          f3 = (v3 - c4) / (1 - c4);
        }
        return [hsv[0], c4 * 100, f3 * 100];
      };
      convert.hcg.rgb = function(hcg) {
        var h2 = hcg[0] / 360;
        var c4 = hcg[1] / 100;
        var g3 = hcg[2] / 100;
        if (c4 === 0) {
          return [g3 * 255, g3 * 255, g3 * 255];
        }
        var pure = [0, 0, 0];
        var hi = h2 % 1 * 6;
        var v3 = hi % 1;
        var w3 = 1 - v3;
        var mg = 0;
        switch (Math.floor(hi)) {
          case 0:
            pure[0] = 1;
            pure[1] = v3;
            pure[2] = 0;
            break;
          case 1:
            pure[0] = w3;
            pure[1] = 1;
            pure[2] = 0;
            break;
          case 2:
            pure[0] = 0;
            pure[1] = 1;
            pure[2] = v3;
            break;
          case 3:
            pure[0] = 0;
            pure[1] = w3;
            pure[2] = 1;
            break;
          case 4:
            pure[0] = v3;
            pure[1] = 0;
            pure[2] = 1;
            break;
          default:
            pure[0] = 1;
            pure[1] = 0;
            pure[2] = w3;
        }
        mg = (1 - c4) * g3;
        return [
          (c4 * pure[0] + mg) * 255,
          (c4 * pure[1] + mg) * 255,
          (c4 * pure[2] + mg) * 255
        ];
      };
      convert.hcg.hsv = function(hcg) {
        var c4 = hcg[1] / 100;
        var g3 = hcg[2] / 100;
        var v3 = c4 + g3 * (1 - c4);
        var f3 = 0;
        if (v3 > 0) {
          f3 = c4 / v3;
        }
        return [hcg[0], f3 * 100, v3 * 100];
      };
      convert.hcg.hsl = function(hcg) {
        var c4 = hcg[1] / 100;
        var g3 = hcg[2] / 100;
        var l4 = g3 * (1 - c4) + 0.5 * c4;
        var s3 = 0;
        if (l4 > 0 && l4 < 0.5) {
          s3 = c4 / (2 * l4);
        } else if (l4 >= 0.5 && l4 < 1) {
          s3 = c4 / (2 * (1 - l4));
        }
        return [hcg[0], s3 * 100, l4 * 100];
      };
      convert.hcg.hwb = function(hcg) {
        var c4 = hcg[1] / 100;
        var g3 = hcg[2] / 100;
        var v3 = c4 + g3 * (1 - c4);
        return [hcg[0], (v3 - c4) * 100, (1 - v3) * 100];
      };
      convert.hwb.hcg = function(hwb) {
        var w3 = hwb[1] / 100;
        var b3 = hwb[2] / 100;
        var v3 = 1 - b3;
        var c4 = v3 - w3;
        var g3 = 0;
        if (c4 < 1) {
          g3 = (v3 - c4) / (1 - c4);
        }
        return [hwb[0], c4 * 100, g3 * 100];
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
        for (var len = models.length, i4 = 0; i4 < len; i4++) {
          graph[models[i4]] = {
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
          for (var len = adjacents.length, i4 = 0; i4 < len; i4++) {
            var adjacent = adjacents[i4];
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
        for (var len = models.length, i4 = 0; i4 < len; i4++) {
          var toModel = models[i4];
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
            for (var len = result.length, i4 = 0; i4 < len; i4++) {
              result[i4] = Math.round(result[i4]);
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
        var rgb = [0, 0, 0], a4 = 1, match = string.match(abbr);
        if (match) {
          match = match[1];
          for (var i4 = 0; i4 < rgb.length; i4++) {
            rgb[i4] = parseInt(match[i4] + match[i4], 16);
          }
        } else if (match = string.match(hex)) {
          match = match[1];
          for (var i4 = 0; i4 < rgb.length; i4++) {
            rgb[i4] = parseInt(match.slice(i4 * 2, i4 * 2 + 2), 16);
          }
        } else if (match = string.match(rgba)) {
          for (var i4 = 0; i4 < rgb.length; i4++) {
            rgb[i4] = parseInt(match[i4 + 1]);
          }
          a4 = parseFloat(match[4]);
        } else if (match = string.match(per)) {
          for (var i4 = 0; i4 < rgb.length; i4++) {
            rgb[i4] = Math.round(parseFloat(match[i4 + 1]) * 2.55);
          }
          a4 = parseFloat(match[4]);
        } else if (match = string.match(keyword2)) {
          if (match[1] == "transparent") {
            return [0, 0, 0, 0];
          }
          rgb = colorNames[match[1]];
          if (!rgb) {
            return;
          }
        }
        for (var i4 = 0; i4 < rgb.length; i4++) {
          rgb[i4] = scale(rgb[i4], 0, 255);
        }
        if (!a4 && a4 != 0) {
          a4 = 1;
        } else {
          a4 = scale(a4, 0, 1);
        }
        rgb[3] = a4;
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
          var h2 = scale(parseInt(match[1]), 0, 360), s3 = scale(parseFloat(match[2]), 0, 100), l4 = scale(parseFloat(match[3]), 0, 100), a4 = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
          return [h2, s3, l4, a4];
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
          var h2 = scale(parseInt(match[1]), 0, 360), w3 = scale(parseFloat(match[2]), 0, 100), b3 = scale(parseFloat(match[3]), 0, 100), a4 = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
          return [h2, w3, b3, a4];
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
        var r4 = Math.round(rgba[0] / 255 * 100), g3 = Math.round(rgba[1] / 255 * 100), b3 = Math.round(rgba[2] / 255 * 100);
        return "rgb(" + r4 + "%, " + g3 + "%, " + b3 + "%)";
      }
      function percentaString(rgba, alpha) {
        var r4 = Math.round(rgba[0] / 255 * 100), g3 = Math.round(rgba[1] / 255 * 100), b3 = Math.round(rgba[2] / 255 * 100);
        return "rgba(" + r4 + "%, " + g3 + "%, " + b3 + "%, " + (alpha || rgba[3] || 1) + ")";
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
          for (var i4 = 0; i4 < 3; i4++) {
            glRgba[i4] = rgb[i4] / 255;
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
          for (var i4 = 0; i4 < rgb.length; i4++) {
            var chan = rgb[i4] / 255;
            lum[i4] = chan <= 0.03928 ? chan / 12.92 : Math.pow((chan + 0.055) / 1.055, 2.4);
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
          for (var i4 = 0; i4 < 3; i4++) {
            rgb[i4] = 255 - this.values.rgb[i4];
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
          var p3 = weight === void 0 ? 0.5 : weight;
          var w3 = 2 * p3 - 1;
          var a4 = color1.alpha() - color2.alpha();
          var w1 = ((w3 * a4 === -1 ? w3 : (w3 + a4) / (1 + w3 * a4)) + 1) / 2;
          var w22 = 1 - w1;
          return this.rgb(
            w1 * color1.red() + w22 * color2.red(),
            w1 * color1.green() + w22 * color2.green(),
            w1 * color1.blue() + w22 * color2.blue()
          ).alpha(color1.alpha() * p3 + color2.alpha() * (1 - p3));
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
        for (var i4 = 0; i4 < space.length; i4++) {
          vals[space.charAt(i4)] = this.values[space][i4];
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
        var i4;
        var alpha = 1;
        if (space === "alpha") {
          alpha = vals;
        } else if (vals.length) {
          this.values[space] = vals.slice(0, space.length);
          alpha = vals[space.length];
        } else if (vals[space.charAt(0)] !== void 0) {
          for (i4 = 0; i4 < space.length; i4++) {
            this.values[space][i4] = vals[space.charAt(i4)];
          }
          alpha = vals.a;
        } else if (vals[spaces[space][0]] !== void 0) {
          var chans = spaces[space];
          for (i4 = 0; i4 < space.length; i4++) {
            this.values[space][i4] = vals[chans[i4]];
          }
          alpha = vals.alpha;
        }
        this.values.alpha = Math.max(0, Math.min(1, alpha === void 0 ? this.values.alpha : alpha));
        if (space === "alpha") {
          return false;
        }
        var capped;
        for (i4 = 0; i4 < space.length; i4++) {
          capped = Math.max(0, Math.min(maxes[space][i4], this.values[space][i4]));
          this.values[space][i4] = Math.round(capped);
        }
        for (var sname in spaces) {
          if (sname !== space) {
            this.values[sname] = convert[space][sname](this.values[space]);
          }
          for (i4 = 0; i4 < sname.length; i4++) {
            capped = Math.max(0, Math.min(maxes[sname][i4], this.values[sname][i4]));
            this.values[sname][i4] = Math.round(capped);
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
        for (var i4 = 0; i4 < shapeCount - 1; i4++) {
          genShape(paper, remainingColors, diameter, i4, shapeCount - 1);
        }
        return container;
      }
      function genShape(paper, remainingColors, diameter, i4, total) {
        var shape = paper.rect(0, 0, diameter, diameter);
        shape.rotate(360 * generator.random());
        var trans = diameter / total * generator.random() + i4 * diameter / total;
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
  var import_jazzicon = __toESM(require_jazzicon());

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
  function h(n2, l4) {
    for (var u4 in l4)
      n2[u4] = l4[u4];
    return n2;
  }
  function p(n2) {
    var l4 = n2.parentNode;
    l4 && l4.removeChild(n2);
  }
  function y(l4, u4, i4) {
    var t3, o4, r4, f3 = {};
    for (r4 in u4)
      "key" == r4 ? t3 = u4[r4] : "ref" == r4 ? o4 = u4[r4] : f3[r4] = u4[r4];
    if (arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : i4), "function" == typeof l4 && null != l4.defaultProps)
      for (r4 in l4.defaultProps)
        void 0 === f3[r4] && (f3[r4] = l4.defaultProps[r4]);
    return d(l4, f3, t3, o4, null);
  }
  function d(n2, i4, t3, o4, r4) {
    var f3 = { type: n2, props: i4, key: t3, ref: o4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == r4 ? ++u : r4 };
    return null == r4 && null != l.vnode && l.vnode(f3), f3;
  }
  function k(n2) {
    return n2.children;
  }
  function b(n2, l4) {
    this.props = n2, this.context = l4;
  }
  function g(n2, l4) {
    if (null == l4)
      return n2.__ ? g(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u4; l4 < n2.__k.length; l4++)
      if (null != (u4 = n2.__k[l4]) && null != u4.__e)
        return u4.__e;
    return "function" == typeof n2.type ? g(n2) : null;
  }
  function m(n2) {
    var l4, u4;
    if (null != (n2 = n2.__) && null != n2.__c) {
      for (n2.__e = n2.__c.base = null, l4 = 0; l4 < n2.__k.length; l4++)
        if (null != (u4 = n2.__k[l4]) && null != u4.__e) {
          n2.__e = n2.__c.base = u4.__e;
          break;
        }
      return m(n2);
    }
  }
  function w(n2) {
    (!n2.__d && (n2.__d = true) && t.push(n2) && !x.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(x);
  }
  function x() {
    var n2, l4, u4, i4, o4, r4, e3, c4;
    for (t.sort(f); n2 = t.shift(); )
      n2.__d && (l4 = t.length, i4 = void 0, o4 = void 0, e3 = (r4 = (u4 = n2).__v).__e, (c4 = u4.__P) && (i4 = [], (o4 = h({}, r4)).__v = r4.__v + 1, L(c4, r4, o4, u4.__n, void 0 !== c4.ownerSVGElement, null != r4.__h ? [e3] : null, i4, null == e3 ? g(r4) : e3, r4.__h), M(i4, r4), r4.__e != e3 && m(r4)), t.length > l4 && t.sort(f));
    x.__r = 0;
  }
  function P(n2, l4, u4, i4, t3, o4, r4, f3, e3, a4) {
    var h2, p3, y2, _3, b3, m3, w3, x2 = i4 && i4.__k || s, P2 = x2.length;
    for (u4.__k = [], h2 = 0; h2 < l4.length; h2++)
      if (null != (_3 = u4.__k[h2] = null == (_3 = l4[h2]) || "boolean" == typeof _3 || "function" == typeof _3 ? null : "string" == typeof _3 || "number" == typeof _3 || "bigint" == typeof _3 ? d(null, _3, null, null, _3) : v(_3) ? d(k, { children: _3 }, null, null, null) : _3.__b > 0 ? d(_3.type, _3.props, _3.key, _3.ref ? _3.ref : null, _3.__v) : _3)) {
        if (_3.__ = u4, _3.__b = u4.__b + 1, null === (y2 = x2[h2]) || y2 && _3.key == y2.key && _3.type === y2.type)
          x2[h2] = void 0;
        else
          for (p3 = 0; p3 < P2; p3++) {
            if ((y2 = x2[p3]) && _3.key == y2.key && _3.type === y2.type) {
              x2[p3] = void 0;
              break;
            }
            y2 = null;
          }
        L(n2, _3, y2 = y2 || c, t3, o4, r4, f3, e3, a4), b3 = _3.__e, (p3 = _3.ref) && y2.ref != p3 && (w3 || (w3 = []), y2.ref && w3.push(y2.ref, null, _3), w3.push(p3, _3.__c || b3, _3)), null != b3 ? (null == m3 && (m3 = b3), "function" == typeof _3.type && _3.__k === y2.__k ? _3.__d = e3 = C(_3, e3, n2) : e3 = $(n2, _3, y2, x2, b3, e3), "function" == typeof u4.type && (u4.__d = e3)) : e3 && y2.__e == e3 && e3.parentNode != n2 && (e3 = g(y2));
      }
    for (u4.__e = m3, h2 = P2; h2--; )
      null != x2[h2] && ("function" == typeof u4.type && null != x2[h2].__e && x2[h2].__e == u4.__d && (u4.__d = A(i4).nextSibling), q(x2[h2], x2[h2]));
    if (w3)
      for (h2 = 0; h2 < w3.length; h2++)
        O(w3[h2], w3[++h2], w3[++h2]);
  }
  function C(n2, l4, u4) {
    for (var i4, t3 = n2.__k, o4 = 0; t3 && o4 < t3.length; o4++)
      (i4 = t3[o4]) && (i4.__ = n2, l4 = "function" == typeof i4.type ? C(i4, l4, u4) : $(u4, i4, i4, t3, i4.__e, l4));
    return l4;
  }
  function $(n2, l4, u4, i4, t3, o4) {
    var r4, f3, e3;
    if (void 0 !== l4.__d)
      r4 = l4.__d, l4.__d = void 0;
    else if (null == u4 || t3 != o4 || null == t3.parentNode)
      n:
        if (null == o4 || o4.parentNode !== n2)
          n2.appendChild(t3), r4 = null;
        else {
          for (f3 = o4, e3 = 0; (f3 = f3.nextSibling) && e3 < i4.length; e3 += 1)
            if (f3 == t3)
              break n;
          n2.insertBefore(t3, o4), r4 = o4;
        }
    return void 0 !== r4 ? r4 : t3.nextSibling;
  }
  function A(n2) {
    var l4, u4, i4;
    if (null == n2.type || "string" == typeof n2.type)
      return n2.__e;
    if (n2.__k) {
      for (l4 = n2.__k.length - 1; l4 >= 0; l4--)
        if ((u4 = n2.__k[l4]) && (i4 = A(u4)))
          return i4;
    }
    return null;
  }
  function H(n2, l4, u4, i4, t3) {
    var o4;
    for (o4 in u4)
      "children" === o4 || "key" === o4 || o4 in l4 || T(n2, o4, null, u4[o4], i4);
    for (o4 in l4)
      t3 && "function" != typeof l4[o4] || "children" === o4 || "key" === o4 || "value" === o4 || "checked" === o4 || u4[o4] === l4[o4] || T(n2, o4, l4[o4], u4[o4], i4);
  }
  function I(n2, l4, u4) {
    "-" === l4[0] ? n2.setProperty(l4, null == u4 ? "" : u4) : n2[l4] = null == u4 ? "" : "number" != typeof u4 || a.test(l4) ? u4 : u4 + "px";
  }
  function T(n2, l4, u4, i4, t3) {
    var o4;
    n:
      if ("style" === l4)
        if ("string" == typeof u4)
          n2.style.cssText = u4;
        else {
          if ("string" == typeof i4 && (n2.style.cssText = i4 = ""), i4)
            for (l4 in i4)
              u4 && l4 in u4 || I(n2.style, l4, "");
          if (u4)
            for (l4 in u4)
              i4 && u4[l4] === i4[l4] || I(n2.style, l4, u4[l4]);
        }
      else if ("o" === l4[0] && "n" === l4[1])
        o4 = l4 !== (l4 = l4.replace(/Capture$/, "")), l4 = l4.toLowerCase() in n2 ? l4.toLowerCase().slice(2) : l4.slice(2), n2.l || (n2.l = {}), n2.l[l4 + o4] = u4, u4 ? i4 || n2.addEventListener(l4, o4 ? z : j, o4) : n2.removeEventListener(l4, o4 ? z : j, o4);
      else if ("dangerouslySetInnerHTML" !== l4) {
        if (t3)
          l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("width" !== l4 && "height" !== l4 && "href" !== l4 && "list" !== l4 && "form" !== l4 && "tabIndex" !== l4 && "download" !== l4 && "rowSpan" !== l4 && "colSpan" !== l4 && l4 in n2)
          try {
            n2[l4] = null == u4 ? "" : u4;
            break n;
          } catch (n3) {
          }
        "function" == typeof u4 || (null == u4 || false === u4 && "-" !== l4[4] ? n2.removeAttribute(l4) : n2.setAttribute(l4, u4));
      }
  }
  function j(n2) {
    return this.l[n2.type + false](l.event ? l.event(n2) : n2);
  }
  function z(n2) {
    return this.l[n2.type + true](l.event ? l.event(n2) : n2);
  }
  function L(n2, u4, i4, t3, o4, r4, f3, e3, c4) {
    var s3, a4, p3, y2, d3, _3, g3, m3, w3, x2, C2, S, $2, A2, H2, I2 = u4.type;
    if (void 0 !== u4.constructor)
      return null;
    null != i4.__h && (c4 = i4.__h, e3 = u4.__e = i4.__e, u4.__h = null, r4 = [e3]), (s3 = l.__b) && s3(u4);
    try {
      n:
        if ("function" == typeof I2) {
          if (m3 = u4.props, w3 = (s3 = I2.contextType) && t3[s3.__c], x2 = s3 ? w3 ? w3.props.value : s3.__ : t3, i4.__c ? g3 = (a4 = u4.__c = i4.__c).__ = a4.__E : ("prototype" in I2 && I2.prototype.render ? u4.__c = a4 = new I2(m3, x2) : (u4.__c = a4 = new b(m3, x2), a4.constructor = I2, a4.render = B), w3 && w3.sub(a4), a4.props = m3, a4.state || (a4.state = {}), a4.context = x2, a4.__n = t3, p3 = a4.__d = true, a4.__h = [], a4._sb = []), null == a4.__s && (a4.__s = a4.state), null != I2.getDerivedStateFromProps && (a4.__s == a4.state && (a4.__s = h({}, a4.__s)), h(a4.__s, I2.getDerivedStateFromProps(m3, a4.__s))), y2 = a4.props, d3 = a4.state, a4.__v = u4, p3)
            null == I2.getDerivedStateFromProps && null != a4.componentWillMount && a4.componentWillMount(), null != a4.componentDidMount && a4.__h.push(a4.componentDidMount);
          else {
            if (null == I2.getDerivedStateFromProps && m3 !== y2 && null != a4.componentWillReceiveProps && a4.componentWillReceiveProps(m3, x2), !a4.__e && null != a4.shouldComponentUpdate && false === a4.shouldComponentUpdate(m3, a4.__s, x2) || u4.__v === i4.__v) {
              for (u4.__v !== i4.__v && (a4.props = m3, a4.state = a4.__s, a4.__d = false), a4.__e = false, u4.__e = i4.__e, u4.__k = i4.__k, u4.__k.forEach(function(n3) {
                n3 && (n3.__ = u4);
              }), C2 = 0; C2 < a4._sb.length; C2++)
                a4.__h.push(a4._sb[C2]);
              a4._sb = [], a4.__h.length && f3.push(a4);
              break n;
            }
            null != a4.componentWillUpdate && a4.componentWillUpdate(m3, a4.__s, x2), null != a4.componentDidUpdate && a4.__h.push(function() {
              a4.componentDidUpdate(y2, d3, _3);
            });
          }
          if (a4.context = x2, a4.props = m3, a4.__P = n2, S = l.__r, $2 = 0, "prototype" in I2 && I2.prototype.render) {
            for (a4.state = a4.__s, a4.__d = false, S && S(u4), s3 = a4.render(a4.props, a4.state, a4.context), A2 = 0; A2 < a4._sb.length; A2++)
              a4.__h.push(a4._sb[A2]);
            a4._sb = [];
          } else
            do {
              a4.__d = false, S && S(u4), s3 = a4.render(a4.props, a4.state, a4.context), a4.state = a4.__s;
            } while (a4.__d && ++$2 < 25);
          a4.state = a4.__s, null != a4.getChildContext && (t3 = h(h({}, t3), a4.getChildContext())), p3 || null == a4.getSnapshotBeforeUpdate || (_3 = a4.getSnapshotBeforeUpdate(y2, d3)), P(n2, v(H2 = null != s3 && s3.type === k && null == s3.key ? s3.props.children : s3) ? H2 : [H2], u4, i4, t3, o4, r4, f3, e3, c4), a4.base = u4.__e, u4.__h = null, a4.__h.length && f3.push(a4), g3 && (a4.__E = a4.__ = null), a4.__e = false;
        } else
          null == r4 && u4.__v === i4.__v ? (u4.__k = i4.__k, u4.__e = i4.__e) : u4.__e = N(i4.__e, u4, i4, t3, o4, r4, f3, c4);
      (s3 = l.diffed) && s3(u4);
    } catch (n3) {
      u4.__v = null, (c4 || null != r4) && (u4.__e = e3, u4.__h = !!c4, r4[r4.indexOf(e3)] = null), l.__e(n3, u4, i4);
    }
  }
  function M(n2, u4) {
    l.__c && l.__c(u4, n2), n2.some(function(u5) {
      try {
        n2 = u5.__h, u5.__h = [], n2.some(function(n3) {
          n3.call(u5);
        });
      } catch (n3) {
        l.__e(n3, u5.__v);
      }
    });
  }
  function N(l4, u4, i4, t3, o4, r4, f3, e3) {
    var s3, a4, h2, y2 = i4.props, d3 = u4.props, _3 = u4.type, k3 = 0;
    if ("svg" === _3 && (o4 = true), null != r4) {
      for (; k3 < r4.length; k3++)
        if ((s3 = r4[k3]) && "setAttribute" in s3 == !!_3 && (_3 ? s3.localName === _3 : 3 === s3.nodeType)) {
          l4 = s3, r4[k3] = null;
          break;
        }
    }
    if (null == l4) {
      if (null === _3)
        return document.createTextNode(d3);
      l4 = o4 ? document.createElementNS("http://www.w3.org/2000/svg", _3) : document.createElement(_3, d3.is && d3), r4 = null, e3 = false;
    }
    if (null === _3)
      y2 === d3 || e3 && l4.data === d3 || (l4.data = d3);
    else {
      if (r4 = r4 && n.call(l4.childNodes), a4 = (y2 = i4.props || c).dangerouslySetInnerHTML, h2 = d3.dangerouslySetInnerHTML, !e3) {
        if (null != r4)
          for (y2 = {}, k3 = 0; k3 < l4.attributes.length; k3++)
            y2[l4.attributes[k3].name] = l4.attributes[k3].value;
        (h2 || a4) && (h2 && (a4 && h2.__html == a4.__html || h2.__html === l4.innerHTML) || (l4.innerHTML = h2 && h2.__html || ""));
      }
      if (H(l4, d3, y2, o4, e3), h2)
        u4.__k = [];
      else if (P(l4, v(k3 = u4.props.children) ? k3 : [k3], u4, i4, t3, o4 && "foreignObject" !== _3, r4, f3, r4 ? r4[0] : i4.__k && g(i4, 0), e3), null != r4)
        for (k3 = r4.length; k3--; )
          null != r4[k3] && p(r4[k3]);
      e3 || ("value" in d3 && void 0 !== (k3 = d3.value) && (k3 !== l4.value || "progress" === _3 && !k3 || "option" === _3 && k3 !== y2.value) && T(l4, "value", k3, y2.value, false), "checked" in d3 && void 0 !== (k3 = d3.checked) && k3 !== l4.checked && T(l4, "checked", k3, y2.checked, false));
    }
    return l4;
  }
  function O(n2, u4, i4) {
    try {
      "function" == typeof n2 ? n2(u4) : n2.current = u4;
    } catch (n3) {
      l.__e(n3, i4);
    }
  }
  function q(n2, u4, i4) {
    var t3, o4;
    if (l.unmount && l.unmount(n2), (t3 = n2.ref) && (t3.current && t3.current !== n2.__e || O(t3, null, u4)), null != (t3 = n2.__c)) {
      if (t3.componentWillUnmount)
        try {
          t3.componentWillUnmount();
        } catch (n3) {
          l.__e(n3, u4);
        }
      t3.base = t3.__P = null, n2.__c = void 0;
    }
    if (t3 = n2.__k)
      for (o4 = 0; o4 < t3.length; o4++)
        t3[o4] && q(t3[o4], u4, i4 || "function" != typeof n2.type);
    i4 || null == n2.__e || p(n2.__e), n2.__ = n2.__e = n2.__d = void 0;
  }
  function B(n2, l4, u4) {
    return this.constructor(n2, u4);
  }
  function D(u4, i4, t3) {
    var o4, r4, f3;
    l.__ && l.__(u4, i4), r4 = (o4 = "function" == typeof t3) ? null : t3 && t3.__k || i4.__k, f3 = [], L(i4, u4 = (!o4 && t3 || i4).__k = y(k, null, [u4]), r4 || c, c, void 0 !== i4.ownerSVGElement, !o4 && t3 ? [t3] : r4 ? null : i4.firstChild ? n.call(i4.childNodes) : null, f3, !o4 && t3 ? t3 : r4 ? r4.__e : i4.firstChild, o4), M(f3, u4);
  }
  function E(n2, l4) {
    D(n2, l4, E);
  }
  function F(l4, u4, i4) {
    var t3, o4, r4, f3, e3 = h({}, l4.props);
    for (r4 in l4.type && l4.type.defaultProps && (f3 = l4.type.defaultProps), u4)
      "key" == r4 ? t3 = u4[r4] : "ref" == r4 ? o4 = u4[r4] : e3[r4] = void 0 === u4[r4] && void 0 !== f3 ? f3[r4] : u4[r4];
    return arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : i4), d(l4.type, e3, t3 || l4.key, o4 || l4.ref, null);
  }
  n = s.slice, l = { __e: function(n2, l4, u4, i4) {
    for (var t3, o4, r4; l4 = l4.__; )
      if ((t3 = l4.__c) && !t3.__)
        try {
          if ((o4 = t3.constructor) && null != o4.getDerivedStateFromError && (t3.setState(o4.getDerivedStateFromError(n2)), r4 = t3.__d), null != t3.componentDidCatch && (t3.componentDidCatch(n2, i4 || {}), r4 = t3.__d), r4)
            return t3.__E = t3;
        } catch (l5) {
          n2 = l5;
        }
    throw n2;
  } }, u = 0, i = function(n2) {
    return null != n2 && void 0 === n2.constructor;
  }, b.prototype.setState = function(n2, l4) {
    var u4;
    u4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = h({}, this.state), "function" == typeof n2 && (n2 = n2(h({}, u4), this.props)), n2 && h(u4, n2), null != n2 && this.__v && (l4 && this._sb.push(l4), w(this));
  }, b.prototype.forceUpdate = function(n2) {
    this.__v && (this.__e = true, n2 && this.__h.push(n2), w(this));
  }, b.prototype.render = k, t = [], r = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n2, l4) {
    return n2.__v.__b - l4.__v.__b;
  }, x.__r = 0, e = 0;

  // node_modules/preact-custom-element/dist/preact-custom-element.esm.js
  function r2() {
    return (r2 = Object.assign || function(t3) {
      for (var e3 = 1; e3 < arguments.length; e3++) {
        var n2 = arguments[e3];
        for (var o4 in n2)
          Object.prototype.hasOwnProperty.call(n2, o4) && (t3[o4] = n2[o4]);
      }
      return t3;
    }).apply(this, arguments);
  }
  function i2(t3) {
    this.getChildContext = function() {
      return t3.context;
    };
    var e3 = t3.children, n2 = function(t4, e4) {
      if (null == t4)
        return {};
      var n3, o4, r4 = {}, i4 = Object.keys(t4);
      for (o4 = 0; o4 < i4.length; o4++)
        e4.indexOf(n3 = i4[o4]) >= 0 || (r4[n3] = t4[n3]);
      return r4;
    }(t3, ["context", "children"]);
    return F(e3, n2);
  }
  function a2() {
    var o4 = new CustomEvent("_preact", { detail: {}, bubbles: true, cancelable: true });
    this.dispatchEvent(o4), this._vdom = y(i2, r2({}, this._props, { context: o4.detail.context }), function e3(n2, o5) {
      if (3 === n2.nodeType)
        return n2.data;
      if (1 !== n2.nodeType)
        return null;
      var r4 = [], i4 = {}, a4 = 0, c4 = n2.attributes, l4 = n2.childNodes;
      for (a4 = c4.length; a4--; )
        "slot" !== c4[a4].name && (i4[c4[a4].name] = c4[a4].value, i4[s2(c4[a4].name)] = c4[a4].value);
      for (a4 = l4.length; a4--; ) {
        var p3 = e3(l4[a4], null), d3 = l4[a4].slot;
        d3 ? i4[d3] = y(u2, { name: d3 }, p3) : r4[a4] = p3;
      }
      var h2 = o5 ? y(u2, null, r4) : r4;
      return y(o5 || n2.nodeName.toLowerCase(), i4, h2);
    }(this, this._vdomComponent)), (this.hasAttribute("hydrate") ? E : D)(this._vdom, this._root);
  }
  function s2(t3) {
    return t3.replace(/-(\w)/g, function(t4, e3) {
      return e3 ? e3.toUpperCase() : "";
    });
  }
  function c2(t3, e3, r4) {
    if (this._vdom) {
      var i4 = {};
      i4[t3] = r4 = null == r4 ? void 0 : r4, i4[s2(t3)] = r4, this._vdom = F(this._vdom, i4), D(this._vdom, this._root);
    }
  }
  function l2() {
    D(this._vdom = null, this._root);
  }
  function u2(e3, n2) {
    var o4 = this;
    return y("slot", r2({}, e3, { ref: function(t3) {
      t3 ? (o4.ref = t3, o4._listener || (o4._listener = function(t4) {
        t4.stopPropagation(), t4.detail.context = n2;
      }, t3.addEventListener("_preact", o4._listener))) : o4.ref.removeEventListener("_preact", o4._listener);
    } }));
  }
  function preact_custom_element_esm_default(t3, e3, n2, o4) {
    function r4() {
      var e4 = Reflect.construct(HTMLElement, [], r4);
      return e4._vdomComponent = t3, e4._root = o4 && o4.shadow ? e4.attachShadow({ mode: "open" }) : e4, e4;
    }
    return (r4.prototype = Object.create(HTMLElement.prototype)).constructor = r4, r4.prototype.connectedCallback = a2, r4.prototype.attributeChangedCallback = c2, r4.prototype.disconnectedCallback = l2, n2 = n2 || t3.observedAttributes || Object.keys(t3.propTypes || {}), r4.observedAttributes = n2, n2.forEach(function(t4) {
      Object.defineProperty(r4.prototype, t4, { get: function() {
        return this._vdom.props[t4];
      }, set: function(e4) {
        this._vdom ? this.attributeChangedCallback(t4, null, e4) : (this._props || (this._props = {}), this._props[t4] = e4, this.connectedCallback());
        var n3 = typeof e4;
        null != e4 && "string" !== n3 && "boolean" !== n3 && "number" !== n3 || this.setAttribute(t4, e4);
      } });
    }), customElements.define(e3 || t3.tagName || t3.displayName || t3.name, r4);
  }

  // node_modules/preact/hooks/dist/hooks.module.js
  var t2;
  var r3;
  var u3;
  var i3;
  var o2 = 0;
  var f2 = [];
  var c3 = [];
  var e2 = l.__b;
  var a3 = l.__r;
  var v2 = l.diffed;
  var l3 = l.__c;
  var m2 = l.unmount;
  function d2(t3, u4) {
    l.__h && l.__h(r3, t3, o2 || u4), o2 = 0;
    var i4 = r3.__H || (r3.__H = { __: [], __h: [] });
    return t3 >= i4.__.length && i4.__.push({ __V: c3 }), i4.__[t3];
  }
  function p2(u4, i4) {
    var o4 = d2(t2++, 3);
    !l.__s && z2(o4.__H, i4) && (o4.__ = u4, o4.i = i4, r3.__H.__h.push(o4));
  }
  function _(n2) {
    return o2 = 5, F2(function() {
      return { current: n2 };
    }, []);
  }
  function F2(n2, r4) {
    var u4 = d2(t2++, 7);
    return z2(u4.__H, r4) ? (u4.__V = n2(), u4.i = r4, u4.__h = n2, u4.__V) : u4.__;
  }
  function b2() {
    for (var t3; t3 = f2.shift(); )
      if (t3.__P && t3.__H)
        try {
          t3.__H.__h.forEach(k2), t3.__H.__h.forEach(w2), t3.__H.__h = [];
        } catch (r4) {
          t3.__H.__h = [], l.__e(r4, t3.__v);
        }
  }
  l.__b = function(n2) {
    r3 = null, e2 && e2(n2);
  }, l.__r = function(n2) {
    a3 && a3(n2), t2 = 0;
    var i4 = (r3 = n2.__c).__H;
    i4 && (u3 === r3 ? (i4.__h = [], r3.__h = [], i4.__.forEach(function(n3) {
      n3.__N && (n3.__ = n3.__N), n3.__V = c3, n3.__N = n3.i = void 0;
    })) : (i4.__h.forEach(k2), i4.__h.forEach(w2), i4.__h = [], t2 = 0)), u3 = r3;
  }, l.diffed = function(t3) {
    v2 && v2(t3);
    var o4 = t3.__c;
    o4 && o4.__H && (o4.__H.__h.length && (1 !== f2.push(o4) && i3 === l.requestAnimationFrame || ((i3 = l.requestAnimationFrame) || j2)(b2)), o4.__H.__.forEach(function(n2) {
      n2.i && (n2.__H = n2.i), n2.__V !== c3 && (n2.__ = n2.__V), n2.i = void 0, n2.__V = c3;
    })), u3 = r3 = null;
  }, l.__c = function(t3, r4) {
    r4.some(function(t4) {
      try {
        t4.__h.forEach(k2), t4.__h = t4.__h.filter(function(n2) {
          return !n2.__ || w2(n2);
        });
      } catch (u4) {
        r4.some(function(n2) {
          n2.__h && (n2.__h = []);
        }), r4 = [], l.__e(u4, t4.__v);
      }
    }), l3 && l3(t3, r4);
  }, l.unmount = function(t3) {
    m2 && m2(t3);
    var r4, u4 = t3.__c;
    u4 && u4.__H && (u4.__H.__.forEach(function(n2) {
      try {
        k2(n2);
      } catch (n3) {
        r4 = n3;
      }
    }), u4.__H = void 0, r4 && l.__e(r4, u4.__v));
  };
  var g2 = "function" == typeof requestAnimationFrame;
  function j2(n2) {
    var t3, r4 = function() {
      clearTimeout(u4), g2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, u4 = setTimeout(r4, 100);
    g2 && (t3 = requestAnimationFrame(r4));
  }
  function k2(n2) {
    var t3 = r3, u4 = n2.__c;
    "function" == typeof u4 && (n2.__c = void 0, u4()), r3 = t3;
  }
  function w2(n2) {
    var t3 = r3;
    n2.__c = n2.__(), r3 = t3;
  }
  function z2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, r4) {
      return t4 !== n2[r4];
    });
  }

  // node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
  var _2 = 0;
  function o3(o4, e3, n2, t3, f3, l4) {
    var s3, u4, a4 = {};
    for (u4 in e3)
      "ref" == u4 ? s3 = e3[u4] : a4[u4] = e3[u4];
    var i4 = { type: o4, props: a4, key: n2, ref: s3, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --_2, __source: f3, __self: l4 };
    if ("function" == typeof o4 && (s3 = o4.defaultProps))
      for (u4 in s3)
        void 0 === a4[u4] && (a4[u4] = s3[u4]);
    return l.vnode && l.vnode(i4), i4;
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
      return /* @__PURE__ */ o3("div", { class: "x-icon", ref: div });
    }
  };
  // Register as <x-greeting>:
  XIcon.tagName = "x-icon";
  // Track these attributes:
  XIcon.observedAttributes = ["name"];
  preact_custom_element_esm_default(XIcon);
  var accounts;
  var ACCOUNT_KEY = "accounts";
  async function fetchStorage() {
    if (sessionStorage.getItem(ACCOUNT_KEY) && ethereum.isConnected) {
      try {
        accounts = JSON.parse(sessionStorage.getItem(ACCOUNT_KEY));
        return true;
      } catch (e3) {
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
    } catch (e3) {
      if (e3.code === 4001) {
        console.log("Please connect to MetaMask.");
      } else {
        console.error(e3);
      }
    }
  }
  var COOKIE_KEY = "yofolk-auth";
  async function hasCookie() {
    if (await cookieStore.get(COOKIE_KEY)) {
      try {
        return true;
      } catch (e3) {
        cookieStore.delete(COOKIE_KEY);
      }
    }
    return false;
  }
  async function getWallet() {
    if (ethereum && await hasCookie() && await fetchStorage()) {
      return accounts[0];
    }
  }
  var account;
  var SignOut = () => {
    function signout() {
      cookieStore.delete(COOKIE_KEY);
      cookieStore.delete(COOKIE_KEY);
      account = void 0;
      accounts = void 0;
      location.reload();
    }
    return /* @__PURE__ */ o3("button", { onClick: signout, children: "Sign out" });
  };
  var SignedIn = (props) => {
    return /* @__PURE__ */ o3(k, { children: [
      /* @__PURE__ */ o3("span", { children: [
        "Signed in as ",
        props.wallet
      ] }),
      " ",
      /* @__PURE__ */ o3(SignOut, {})
    ] });
  };
  var XSignIn = class extends b {
    constructor() {
      super(...arguments);
      this.onClick = async () => {
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
        await this.setState({ account: from });
        cookieStore.set(COOKIE_KEY, signature);
        try {
        } catch (err) {
          console.error(err);
          this.setState({ error: err.message });
        }
      };
    }
    async componentDidMount() {
      let account2 = await getWallet();
      if (account2) {
        this.setState({ account: account2 });
      }
    }
    render(props) {
      if (!ethereum) {
        return /* @__PURE__ */ o3("span", {});
      }
      if (this.state.account) {
        return /* @__PURE__ */ o3(SignedIn, { wallet: this.state.account });
      }
      let { value } = props;
      return /* @__PURE__ */ o3("div", { children: [
        this.state.error,
        /* @__PURE__ */ o3("button", { onClick: this.onClick, class: "x-signin", children: value || "Sign in" })
      ] });
    }
  };
  // Register as <x-greeting>:
  XSignIn.tagName = "x-sign-in";
  // Track these attributes:
  XSignIn.observedAttributes = ["name"];
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
