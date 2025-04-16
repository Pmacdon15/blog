import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { GET } from '@/app/api/blogs/route';

// Mock the neon function and its return value
const mockSql = jest.fn();
jest.mock('@neondatabase/serverless', () => ({
  neon: () => mockSql
}));

describe('GET /blogs', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return blogs with pagination', async () => {
    mockSql.mockImplementation(async (query: string, ...params: any[]) => {
      if (query.includes('COUNT(*)')) {
        return [{ count: '10' }];
      } else {
        return [
          {
            id: 1,
            published: true,
            section_id: 1,
            title: 'Test Blog',
            publish_date: new Date(),
            image_src: 'https://example.com/image.jpg',
          },
        ];
      }
    });

    const url = new URL('http://localhost:3000/blogs?page=1&limit=3&published=true');
    const request = new Request(url.toString());
    const response = await GET(request);
    expect(response.status).toBe(200);
    const jsonData = await response.json();
    expect(jsonData).toHaveProperty('blogs');
    expect(jsonData).toHaveProperty('hasMore');
  });

  it('should return 404 when no blogs are found', async () => {
    mockSql.mockImplementation(async (query: string, ...params: any[]) => {
      if (query.includes('COUNT(*)')) {
        return [{ count: '0' }];
      } else {
        return [];
      }
    });

    const url = new URL('http://localhost:3000/blogs?page=1&limit=3&published=true');
    const request = new Request(url.toString());
    const response = await GET(request);
    const jsonData = await response.json();
    expect(jsonData).toHaveProperty('message', 'Blog not found');
    expect(response.status).toBe(404);
  });

  it('should handle invalid page and limit parameters', async () => {
    mockSql.mockImplementation(async (query: string, ...params: any[]) => {
      if (query.includes('COUNT(*)')) {
        return [{ count: '10' }];
      } else {
        return [
          {
            id: 1,
            published: true,
            section_id: 1,
            title: 'Test Blog',
            publish_date: new Date(),
            image_src: 'https://example.com/image.jpg',
          },
        ];
      }
    });

    const url = new URL('http://localhost:3000/blogs?page=abc&limit=def&published=true');
    const request = new Request(url.toString());
    const response = await GET(request);
    expect(response.status).toBe(200);
  });

  it('should handle database errors', async () => {
    mockSql.mockImplementation(() => {
      throw new Error('Database error');
    });

    const url = new URL('http://localhost:3000/blogs?page=1&limit=3&published=true');
    const request = new Request(url.toString());
    const response = await GET(request);
    expect(response.status).toBe(500);
    const text = await response.text();
    expect(text).toContain('Database error');
  });
});