---
marp: true
theme: blueprint
---

<!-- _class: title -->

# MQ超入門

## いちから理解する
## メッセージキューイング

---

## 目次

1. メッセージキューイングとは
2. なぜメッセージキューイングを使うのか
3. 代表的なメッセージキューイングシステム
4. メッセージキューイングのサンプル
5. メッセージキューイングの利用例
6. まとめ

---

<!-- _class: section_title -->

## 1. メッセージキューイングとは

---

## メッセージキューイングとは

- メッセージキューイングとは、メッセージをキューに入れて、後から取り出す仕組み
- 非同期メッセージングとも呼ばれることがあり、
近年マイクロサービスアーキテクチャの普及に伴い、キャッチアップは必須。
- Publish/SubscribeとProducer/Consumerの2つのパターンがある

---

## メッセージキューイングのパターン

### Publish/Subscribe

- メッセージを送信する側をPublisher、受信する側をSubscriberと呼ぶ
- Publisherはメッセージを送信するだけで、Subscriberはメッセージを受信するだけ
- 1対多の関係になる

### Producer/Consumer

- メッセージを送信する側をProducer、受信する側をConsumerと呼ぶ
- Producerはメッセージを送信し、
Consumerはメッセージを受信したら受信完了通知(ack)を返す
- 1対1の関係になる

---

<!--_class: section_title-->
## 2. なぜメッセージキューイングを使うのか

---

## メッセージキューイングを使う理由

メッセージキューイングを使う理由は、

- プログラムが互いに疎結合になる
- プログラムの処理を並列化できる
- プログラムの処理を分散できる

などの理由があります。

下2つの理由は大規模なシステムを組む上で必須となることが多く、
各クラウドベンダーがメッセージキューイングを提供している理由でもあります。

---

<!--_class: section_title-->

## 3. 代表的なメッセージキューイングシステム

---

### RabbitMQ

- Erlangで実装されたメッセージキューイングシステム
- AMQP(Advanced Message Queuing Protocol)というメッセージングプロトコルを採用している

### Apache Kafka

- Scalaで実装されたメッセージキューイングシステム
- メッセージングプロトコルは独自のものを採用している

---

### Apache ActiveMQ

- Javaで実装されたメッセージキューイングシステム
- JMS(Java Message Service)というメッセージングプロトコルを採用している
- Artemisという新世代バージョンもある。

### Amazon SQS

- AWSが提供しているメッセージキューイングシステム

ちなみにAWSはAmazonMQ,RabbitMQ,ActiveMQの3つを別サービスとして提供していたりする。

---

### Google Pub/Sub

- GCPが提供しているメッセージキューイングシステム

### Azure Service Bus

- Azureが提供しているメッセージキューイングシステム
- AMQPを採用している

---


<!--_class: section_title-->

## 4. メッセージキューイングのサンプル

---

### 4. メッセージキューイングのサンプル

今回、メッセージキューイングのサンプルとして、チャットアプリを作成した。

以下レポジトリよりダウンロード可能。

https://github.com/memenashi/rabbitmq-chat-system

---

## 4. メッセージキューイングのサンプル

- Pub/Subパターンをチャット用に利用
- P2Pパターンをダイレクトメッセージ用に利用

### ポイント

- P2Pパターンは、Consumerが複数あると、順繰りにメッセージを受信する。
- 一方Pub/Subパターンは、Subscriberが複数あっても、
すべてのSubscriberにメッセージが送信される。

---

<!--_class: section_title-->

## 5. メッセージキューイングの利用例

---

## 5. メッセージキューイングの利用例

### Nulab

Nulab Appsで管理された組織情報を通達するなど、サービス間での通信に利用

https://nulab.com/ja/blog/nulab/jobqueue-messagequeue/

### ZOZO

ZOZOのカートシステムでは、メッセージキューイングを利用している。

https://techblog.zozo.com/entry/production-ready-zozotown-cart-queueing-system

---

<!--_class: section_title-->

## 6. まとめ

---

## 6. まとめ

- メッセージキューイングとは、メッセージをキューに入れて、
後から取り出す仕組み
- メッセージキューイングを使う理由は、プログラムが互いに疎結合になる、
プログラムの処理を並列化できる、
プログラムの処理を分散できるなどの理由がある
- メッセージキューイングの代表的なシステムは、
RabbitMQ,ActiveMQ,Amazon SQS,Azure Service Busなど
- メッセージキューイングは、マイクロサービスアーキテクチャの普及に伴い、
価値が見直されている。