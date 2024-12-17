import { describe, test, expect, setSystemTime, beforeAll } from 'bun:test';
import { Query } from '@/query/Query';

describe('Query', () => {
  const FAKE_NAME = 'FAKE_NAME';
  const FAKE_ID = 'FAKE_ID';
  const FAKE_PAYLOAD = { fake: 'payload' };

  beforeAll(() => {
    setSystemTime(new Date('2020-02-03T00:00:00.000Z'));
  });

  test('Should create a Query correctly with a payload', () => {
    const FAKE_QUERY = new (class extends Query<{ fake: string }> {
      constructor() {
        super(FAKE_NAME, FAKE_ID, FAKE_PAYLOAD);
      }
    })() as Query<{ fake: string }>;
    expect(FAKE_QUERY).toBeObject();
    expect(FAKE_QUERY.name).toBe(FAKE_NAME);
    expect(FAKE_QUERY.id).toBe(FAKE_ID);
    expect(FAKE_QUERY.payload).toBe(FAKE_PAYLOAD);
    expect(FAKE_QUERY.occurredOn).toBe(Date.now());
    expect(new Date(FAKE_QUERY.occurredOn).getFullYear()).toBe(2020);
    expect(new Date(FAKE_QUERY.occurredOn).getMonth()).toBe(2 - 1);
    expect(new Date(FAKE_QUERY.occurredOn).getDate()).toBe(3);
  });

  test('Should create a Query correctly without payload', () => {
    const FAKE_QUERY = new (class extends Query {
      constructor() {
        super(FAKE_NAME, FAKE_ID, undefined);
      }
    })() as Query;

    expect(FAKE_QUERY.name).toBe(FAKE_NAME);
    expect(FAKE_QUERY.payload).toBeUndefined();
  });

  describe('functions', () => {
    describe('toString', () => {
      test('should work', () => {
        const FAKE_QUERY = new (class extends Query {
          constructor() {
            super(FAKE_NAME, FAKE_ID, undefined);
          }
        })() as Query;

        expect(FAKE_QUERY.toString()).toBeString();
        expect(FAKE_QUERY.toString()).toBe('[QUERY] FAKE_NAME @ 2020/02/03 : FAKE_ID');
      });
    });
  });
});
