import mqtt, { MqttClient } from 'mqtt';
import pino from 'pino';

const logger = pino({ name: 'mqtt-publisher' });

export const createMqttPublisher = (url: string): { client: MqttClient; publish: (topic: string, payload: Record<string, unknown>) => Promise<void> } => {
  const client = mqtt.connect(url);

  client.on('connect', () => logger.info({ url }, 'mqtt connected'));
  client.on('error', (error) => logger.error({ error }, 'mqtt error'));

  const publish = async (topic: string, payload: Record<string, unknown>) => {
    if (!client.connected) {
      await new Promise<void>((resolve, reject) => {
        client.once('connect', () => resolve());
        client.once('error', (err) => reject(err));
      });
    }

    return new Promise<void>((resolve, reject) => {
      client.publish(topic, JSON.stringify(payload), { qos: 1 }, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };

  return { client, publish };
};
