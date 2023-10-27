---
marp: true
theme: blueprint
---

<!-- _class: title -->

# ServiceWorkerと通知<!-- omit in toc -->

## メッセージ受信時に通知を飛ばそう！<!-- omit in toc -->

---

## 目次 <!-- omit in toc -->

1. Push通知とは
2. Push通知の仕組み
3. 今回のソフトウェアの仕組み
4. Push通知の実装
5. 製品への応用

---

<!-- _class: section_title -->

## 1. Push通知とは

---

## 1.1 Push通知とは <!-- omit in toc -->

Push通知は、サーバーからユーザーのデバイスに情報やアラートをリアルタイムで送信する技術です。これにより、アプリやウェブサイトが閉じられていても、ユーザーに重要な情報を迅速に提供することができます。

---

<!-- _class: section_title -->

## 2. Push通知の仕組み

---

## 2.1 どのように動作するのか？ <!-- omit in toc -->

Push通知は、サーバー、サービスワーカー、そしてクライアント（例えばブラウザやアプリ）の3つの主要なコンポーネントで動作します。

1. **サーバー** は新しい情報やアラートを検出すると、サービスワーカーに通知を送信します。
2. **サービスワーカー** は、バックグラウンドで動作し、通知を受信するとクライアントに伝えます。
3. **クライアント** は、通知を受け取ると、ユーザーに表示します。

---

<!-- _class: section_title -->

## 3. 今回のソフトウェアの仕組み

---

## 3.1 ソフトウェアのアーキテクチャ <!-- omit in toc -->

[![](https://mermaid.ink/img/pako:eNqNUU1PwyAY_iuEXduY2HgQE5NS6sFED1bjod2BtW_XphQaoE6z7L_LCmaN8SAH8vA-HzyBI65VA5jgveZTh15ZJZFbaflmQG9RHN8jWlKtDu549QK8tluvoAuXlQXoj76Gd6UHZ1hzrHwGYx8LRHk9gGwCyRYyL5-U3CtGw9TvZt75HpnoQVo_XBIvMPPQBf7pPPcBfZGzC8xXTg9rwY1h0KIGWj4Li9peCLK5SW8jY7UagGySJAk4PvSN7cj19Hn3y22WO4P5IU3_Y15FIBplPw3W0YhFech2YxzhEfTI-8b91vEsq7DtYIQKEweDv8KVPDkpn60qvmSNidUzRHieGm6B9dy90ohJy4WB0zd8UJwJ?type=png)](https://mermaid.live/edit#pako:eNqNUU1PwyAY_iuEXduY2HgQE5NS6sFED1bjod2BtW_XphQaoE6z7L_LCmaN8SAH8vA-HzyBI65VA5jgveZTh15ZJZFbaflmQG9RHN8jWlKtDu549QK8tluvoAuXlQXoj76Gd6UHZ1hzrHwGYx8LRHk9gGwCyRYyL5-U3CtGw9TvZt75HpnoQVo_XBIvMPPQBf7pPPcBfZGzC8xXTg9rwY1h0KIGWj4Li9peCLK5SW8jY7UagGySJAk4PvSN7cj19Hn3y22WO4P5IU3_Y15FIBplPw3W0YhFech2YxzhEfTI-8b91vEsq7DtYIQKEweDv8KVPDkpn60qvmSNidUzRHieGm6B9dy90ohJy4WB0zd8UJwJ)

---

<!-- _class: section_title -->

## 4. Push通知の実装

---

## 4.1 実装のステップ <!-- omit in toc -->

1. サービスワーカーの登録
2. ユーザーの通知許可の取得
3. Push通知の購読
4. サーバーからの通知の受信と表示

---

<!-- _class: section_title -->

## 5. 製品への応用

---

## 5.1 どのように製品で活用するのか <!-- omit in toc -->

Push通知は、製品のユーザーエンゲージメントを向上させるための強力なツールです。
CIERTOで言えば、

- アップロード/ダウンロード
- 動画変換の完了
- エクスポート処理

等の処理が完了した際に、ユーザーに通知を送ることができます。
