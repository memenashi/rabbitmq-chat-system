---
marp: true
theme: blueprint
---

<!-- _class: title -->

# ServiceWorker and Notifications <!-- omit in toc -->

## Send notifications upon message reception! <!-- omit in toc -->

---

## Table of Contents <!-- omit in toc -->

1. What are Push Notifications?
2. Mechanism of Push Notifications
3. Architecture of Our Software
4. Implementation of Push Notifications
5. Application in Products

---

<!-- _class: section_title -->

## 1. What are Push Notifications?

---

## 1.1 What are Push Notifications? <!-- omit in toc -->

Push notifications are a technology that sends information and alerts from the server to the user's device in real-time. This allows the user to receive important information promptly, even when the app or website is closed.

---

<!-- _class: section_title -->

## 2. Mechanism of Push Notifications

---

## 2.1 How do they work? <!-- omit in toc -->

Push notifications operate through three main components: the server, the service worker, and the client (e.g., a browser or app).

1. **Server** detects new information or alerts and sends a notification to the service worker.
2. **Service Worker** operates in the background, and when it receives a notification, it informs the client.
3. **Client** displays the notification to the user upon receipt.

---

<!-- _class: section_title -->

## 3. Architecture of Our Software

---

## 3.1 Software Architecture <!-- omit in toc -->

[![](https://mermaid.ink/img/pako:eNqNUU1PwyAY_iuEXduY2HgQE5NS6sFED1bjod2BtW_XphQaoE6z7L_LCmaN8SAH8vA-HzyBI65VA5jgveZTh15ZJZFbaflmQG9RHN8jWlKtDu549QK8tluvoAuXlQXoj76Gd6UHZ1hzrHwGYx8LRHk9gGwCyRYyL5-U3CtGw9TvZt75HpnoQVo_XBIvMPPQBf7pPPcBfZGzC8xXTg9rwY1h0KIGWj4Li9peCLK5SW8jY7UagGySJAk4PvSN7cj19Hn3y22WO4P5IU3_Y15FIBplPw3W0YhFech2YxzhEfTI-8b91vEsq7DtYIQKEweDv8KVPDkpn60qvmSNidUzRHieGm6B9dy90ohJy4WB0zd8UJwJ)](https://mermaid.live/edit#pako:eNqNUU1PwyAY_iuEXduY2HgQE5NS6sFED1bjod2BtW_XphQaoE6z7L_LCmaN8SAH8vA-HzyBI65VA5jgveZTh15ZJZFbaflmQG9RHN8jWlKtDu549QK8tluvoAuXlQXoj76Gd6UHZ1hzrHwGYx8LRHk9gGwCyRYyL5-U3CtGw9TvZt75HpnoQVo_XBIvMPPQBf7pPPcBfZGzC8xXTg9rwY1h0KIGWj4Li9peCLK5SW8jY7UagGySJAk4PvSN7cj19Hn3y22WO4P5IU3_Y15FIBplPw3W0YhFech2YxzhEfTI-8b91vEsq7DtYIQKEweDv8KVPDkpn60qvmSNidUzRHieGm6B9dy90ohJy4WB0zd8UJwJ)

---

<!-- _class: section_title -->

## 4. Implementation of Push Notifications

---

## 4.1 Steps of Implementation <!-- omit in toc -->

1. Registering the Service Worker
2. Obtaining user permission for notifications
3. Subscribing to Push Notifications
4. Receiving and displaying notifications from the server

---

<!-- _class: section_title -->

## 5. Application in Products

---

## 5.1 How can it be utilized in products? <!-- omit in toc -->

Push notifications are a powerful tool to enhance user engagement in products. In the case of CIERTO, it can:

- Notify upon uploads/downloads completion
- Inform when video conversion is done
- Alert when export processes are finished

This way, users are promptly informed about the completion of various tasks.
