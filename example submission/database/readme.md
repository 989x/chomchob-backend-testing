## Bundlify Documentation

### Quick Start

To quickly run the project, utilize the provided default information in the `configs/seed.ts` file.

Choose between `pnpm` or `npm` for package management both options offer the same functionality. However, for faster installations, we recommend using `pnpm`.

## Setup

Start with Docker
```bash
docker-compose up -d
```

Start with Express
```bash
pnpm install 
pnpm dev 
```

## Problem Solving

**Detail**

### 1. item ที่ขายจะต้องมี ชื่อสินค้า, รายละเอียดสินค้า, ราคาขาย, วันที่เปิดขาย, วันที่เลิกขาย

- เราได้ทำการออกแบบฐานข้อมูลตามเงื่อนไขใน `models/item` ที่มีชื่อ `productName`, `productDetail`, `normalPrice`, `openSaleDate`, `endSaleDate`

### 2.เมื่อลูกค้าซื้อ Item แล้วจะได้รับเป็น code (โดย code อาจถูกบันทึกไว้ล่วงหน้า หรือ อาจถูกสร้างหลังจากซื้อ ก็ได้)

- เราทำการนำ code ที่จะถูกสร้างขึ้นอยู่ใน `models/purchase` เพื่อประโยชน์ต่อการใช้งาน เพราะสามารถทำการเก็บข้อมูลได้ทั้ง ข้อมูลการซื้อขาย และ code รวมอยู่ใน model เดียวได้เลย

### 3. item สามารถจัดโปรโมชั่นลดราคาในช่วงเวลาที่กำหนดได้ เช่น ปกติ ราคา 150 บาท จัดโปรเดือนมกราคม ลดราคาเป็น 100 บาท

- เราจะเก็บข้อมูลไว้ใน `models/item` ที่มีชื่อ `discountPrice`, `discountStartDate`, `discountEndDate` เมื่อจะนำไปใช้งานก็ให้ตรวจสอบวันที่ก่อน แล้วค่อยแสดงราคาโปรโมชั่น
- มีอีกวิธีคือการสร้าง `models/promotion` แต่จะติดปัญหาเมื่อ frontend ทำการเรียก api อาจทำให้การเกิดการเรียก request ที่เพิ่มขึ้นในกรณีที่ต้องเรียกข้อมูลของตัวสินค้า หรือโปรโมชั่น และทาง backend จะต้องทำการคำนวณโปรโมชั่น ผ่าน 2 model คือทั้ง `models/item` และ `models/promotion` ส่งผลทำให้ backend มีการทำงานที่ช้าลง

**Bonus**

### 4. item อาจถูกขายแบบ Bundle เช่น ขาย สกินตัวละครพร้อมกันสองตัวในราคาพิเศษ  หรือขาย กล่องสุ่มไอเท็ม 5 กล่อง ในราคาถูกกว่าปกติ

- เราได้ทำการเก็บข้อมูลใน `models/bundle` โดยข้างในจะทำการเก็บ `models/itemInBundle` และข้างในนั้นอีกทีจะมี `models/item` รวมเอาไว้เพื่อทำการขายรวมกัน
