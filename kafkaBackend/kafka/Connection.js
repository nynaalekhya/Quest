/* eslint-disable no-multi-assign */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable func-names */
/* eslint-disable max-len */
const kafka = require('kafka-node');
const { kafkaport } = require('../config');

function ConnectionProvider() {
  this.getConsumer = function (topic_name) {
    this.client = new kafka.Client(`${kafkaport}:2181`);
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topic_name, partition: 0 },
    ]);
    this.client.on('ready', () => {
      console.log('client ready!');
    });

    return this.kafkaConsumerConnection;
  };

  // Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.Client(`${kafkaport}:2181`);
      const { HighLevelProducer } = kafka;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      // this.kafkaConnection = new kafka.Producer(this.client);
      console.log('producer ready');
    }
    return this.kafkaProducerConnection;
  };
}
exports = module.exports = new ConnectionProvider();
