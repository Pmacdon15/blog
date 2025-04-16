import '@testing-library/jest-dom';

declare global {
  var Request: {
    new (input: string | URL | Request, init?: RequestInit): Request & {
      nextUrl: URL;
    };
  };
  var Response: {
    new (body?: BodyInit | null, init?: ResponseInit): Response & {
      json(): Promise<any>;
      text(): Promise<string>;
    };
  };
  var Headers: {
    new (init?: HeadersInit): Headers & {
      headers: Record<string, string>;
    };
  };
}

// Mock Next.js server components
global.Request = class Request {
  url: string;
  method: string;
  headers: Headers;
  body: BodyInit | null;
  nextUrl: URL;

  constructor(input: string | URL | Request, init?: RequestInit) {
    this.url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    this.method = init?.method || 'GET';
    this.headers = new Headers(init?.headers || {});
    this.body = init?.body || null;
    
    // Add nextUrl property for Next.js API routes
    this.nextUrl = new URL(this.url);
  }
} as any;

global.Response = class Response {
  body: string;
  status: number;
  headers: Headers;

  constructor(body?: BodyInit | null, init?: ResponseInit) {
    this.body = body?.toString() || '';
    this.status = init?.status || 200;
    this.headers = new Headers(init?.headers || {});
  }
  
  json() {
    return Promise.resolve(JSON.parse(this.body));
  }

  text() {
    return Promise.resolve(this.body);
  }
} as any;

global.Headers = class Headers {
  headers: Record<string, string>;

  constructor(init?: HeadersInit) {
    this.headers = {};
    if (init) {
      if (init instanceof Headers) {
        Object.assign(this.headers, init.headers);
      } else if (Array.isArray(init)) {
        init.forEach(([key, value]) => {
          this.headers[key.toLowerCase()] = value;
        });
      } else {
        Object.entries(init).forEach(([key, value]) => {
          this.headers[key.toLowerCase()] = value;
        });
      }
    }
  }
  
  get(name: string) {
    return this.headers[name.toLowerCase()];
  }
  
  set(name: string, value: string) {
    this.headers[name.toLowerCase()] = value;
  }
} as any; 