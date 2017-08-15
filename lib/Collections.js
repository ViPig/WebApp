import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

export const Analysis = new Mongo.Collection('analysis');

export const Networks = new Mongo.Collection('networks');

export const ServerInfo = new Mongo.Collection('machine_status');
