export type Lang = 'en' | 'th'

export type TranslationKey =
  | 'nav.home'
  | 'nav.trips'
  | 'nav.gallery'
  | 'nav.calendar'
  | 'nav.pricing'
  | 'nav.about'
  | 'nav.portal'
  | 'btn.bookNow'
  | 'btn.viewTrip'
  | 'btn.comingSoon'
  | 'btn.submit'
  | 'btn.copy'
  | 'btn.copied'
  | 'form.name'
  | 'form.nameTh'
  | 'form.nameEn'
  | 'form.email'
  | 'form.phone'
  | 'form.passport'
  | 'form.dietary'
  | 'form.medical'
  | 'form.oshcProvider'
  | 'form.oshcExpiry'
  | 'booking.selectTrip'
  | 'booking.deposit'
  | 'booking.payment'
  | 'booking.confirmation'
  | 'booking.summary'
  | 'booking.reference'
  | 'booking.uploadSlip'
  | 'booking.success'
  | 'booking.waiverRequired'
  | 'common.loading'
  | 'common.error'
  | 'common.success'
  | 'common.retry'
  | 'common.required'
  | 'common.seatsRemaining'
  | 'common.fromPrice'
  | 'common.full'
  | 'common.aurora'
  | 'common.standard'
  | 'common.private'
  | 'common.all'
  | 'common.oneday'
  | 'common.overnight'
  | 'common.multiday'
  | 'home.stats.trips'
  | 'home.stats.group'
  | 'home.stats.photographers'
  | 'home.featured'
  | 'home.audience.title'
  | 'home.audience.students'
  | 'home.audience.residents'
  | 'home.audience.couples'
  | 'home.audience.groups'
  | 'pricing.compare'
  | 'about.positioning'
  | 'about.destinations'
  | 'about.oshc'
  | 'about.contact'
  | 'about.crew'
  | 'about.tips'
  | 'waiver.title'
  | 'waiver.signName'
  | 'lang.toggle'
  | 'validation.email'
  | 'validation.phone'
  | 'validation.required'
  | 'validation.waiverClauses'
  | 'booking.rlsError'
  | 'pin.locked'
  | 'pin.invalid'
  | 'pin.connection'
  | 'toast.bookingSuccess'
  | 'toast.bookingFailed'
  | 'toast.paymentUpdated'
  | 'toast.paymentFailed'
  | 'contact.findUs'
  | 'contact.facebook'
  | 'contact.facebook.sub'
  | 'contact.messenger'
  | 'contact.messenger.sub'
  | 'contact.email'
  | 'contact.email.sub'
  | 'contact.phone'
  | 'contact.phone.sub'
  | 'contact.line'
  | 'contact.line.sub'
  | 'contact.googleReviews'
  | 'contact.googleReviews.sub'

type Map = Record<TranslationKey, string>

const en: Map = {
  'nav.home': 'Home',
  'nav.trips': 'Trips',
  'nav.gallery': 'Gallery',
  'nav.calendar': 'Calendar',
  'nav.pricing': 'Pricing',
  'nav.about': 'About',
  'nav.portal': 'Portal',
  'btn.bookNow': 'Book Now',
  'btn.viewTrip': 'View Trip',
  'btn.comingSoon': 'Coming soon',
  'btn.submit': 'Submit Booking',
  'btn.copy': 'Copy',
  'btn.copied': 'Copied!',
  'form.name': 'Name',
  'form.nameTh': 'Name (Thai)',
  'form.nameEn': 'Name (English)',
  'form.email': 'Email',
  'form.phone': 'Phone',
  'form.passport': 'Passport Number',
  'form.dietary': 'Dietary Requirements',
  'form.medical': 'Medical Conditions',
  'form.oshcProvider': 'OSHC Provider',
  'form.oshcExpiry': 'OSHC Expiry Date',
  'booking.selectTrip': 'Select a trip',
  'booking.deposit': 'Deposit due',
  'booking.payment': 'PayID Payment',
  'booking.confirmation': 'Booking Confirmation',
  'booking.summary': 'Trip Summary',
  'booking.reference': 'Booking Reference',
  'booking.uploadSlip': 'Upload payment slip',
  'booking.success': 'Booking submitted! We will verify your PayID deposit shortly.',
  'booking.waiverRequired': 'Please sign the waiver before booking.',
  'common.loading': 'Loading…',
  'common.error': 'Something went wrong. Please try again.',
  'common.success': 'Success',
  'common.retry': 'Try again',
  'common.required': 'Required',
  'common.seatsRemaining': 'seats left',
  'common.fromPrice': 'From',
  'common.full': 'Full',
  'common.aurora': 'Aurora Trip',
  'common.standard': 'Standard',
  'common.private': 'Private',
  'common.all': 'All',
  'common.oneday': 'One Day',
  'common.overnight': 'Overnight',
  'common.multiday': 'Multi-day',
  'home.stats.trips': '13 Trips',
  'home.stats.group': '100% Small Group',
  'home.stats.photographers': 'Local Photographers',
  'home.featured': 'Featured Trips',
  'home.audience.title': 'Who is this trip for?',
  'home.audience.students': 'Thai Students',
  'home.audience.residents': 'PR & Residents',
  'home.audience.couples': 'Couples',
  'home.audience.groups': 'Friend Groups',
  'pricing.compare': 'Standard vs Private',
  'about.positioning': 'Who we are',
  'about.destinations': 'Where we go',
  'about.oshc': 'OSHC & visa support',
  'about.contact': 'Contact',
  'about.crew': 'Meet Saen',
  'about.tips': 'Insider Tips — Aurora Hunting',
  'waiver.title': 'Digital Waiver',
  'waiver.signName': 'Type your full name as digital signature',
  'lang.toggle': 'ไทย',
  'validation.email': 'Enter a valid email address',
  'validation.phone': 'Use Australian mobile format: 04XX XXX XXX',
  'validation.required': 'This field is required',
  'validation.waiverClauses': 'Please accept all waiver clauses',
  'booking.rlsError': 'Booking could not be saved. Please contact Trip2Talk on Messenger.',
  'pin.locked': 'Too many attempts. Try again in',
  'pin.invalid': 'Invalid PIN',
  'pin.connection': 'Connection error',
  'toast.bookingSuccess': 'Booking submitted successfully!',
  'toast.bookingFailed': 'Booking failed. Please try again.',
  'toast.paymentUpdated': 'Payment status updated',
  'toast.paymentFailed': 'Could not update payment status',
  'contact.findUs': 'Find us',
  'contact.facebook': 'Facebook',
  'contact.facebook.sub': 'Follow us here',
  'contact.messenger': 'Messenger',
  'contact.messenger.sub': 'Chat with us',
  'contact.email': 'Email',
  'contact.email.sub': 'Send us a message',
  'contact.phone': 'Call',
  'contact.phone.sub': '0452 044 382',
  'contact.line': 'Line',
  'contact.line.sub': 'Add us on Line',
  'contact.googleReviews': 'Google Reviews',
  'contact.googleReviews.sub': 'See our reviews',
}

const th: Map = {
  'nav.home': 'หน้าแรก',
  'nav.trips': 'ทริป',
  'nav.gallery': 'แกลเลอรี',
  'nav.calendar': 'ปฏิทิน',
  'nav.pricing': 'ราคา',
  'nav.about': 'เกี่ยวกับ',
  'nav.portal': 'พอร์ทัล',
  'btn.bookNow': 'จองเลย',
  'btn.viewTrip': 'ดูทริป',
  'btn.comingSoon': 'เร็วๆ นี้',
  'btn.submit': 'ส่งการจอง',
  'btn.copy': 'คัดลอก',
  'btn.copied': 'คัดลอกแล้ว!',
  'form.name': 'ชื่อ',
  'form.nameTh': 'ชื่อ (ไทย)',
  'form.nameEn': 'ชื่อ (อังกฤษ)',
  'form.email': 'อีเมล',
  'form.phone': 'เบอร์โทร',
  'form.passport': 'เลขหนังสือเดินทาง',
  'form.dietary': 'ข้อจำกัดอาหาร',
  'form.medical': 'โรคประจำตัว',
  'form.oshcProvider': 'ผู้ให้บริการ OSHC',
  'form.oshcExpiry': 'วันหมดอายุ OSHC',
  'booking.selectTrip': 'เลือกทริป',
  'booking.deposit': 'มัดจำ',
  'booking.payment': 'ชำระ PayID',
  'booking.confirmation': 'ยืนยันการจอง',
  'booking.summary': 'สรุปทริป',
  'booking.reference': 'เลขที่การจอง',
  'booking.uploadSlip': 'อัปโหลดสลิป',
  'booking.success': 'ส่งการจองแล้ว! เราจะตรวจสอบมัดจำ PayID ของคุณเร็วๆ นี้',
  'booking.waiverRequired': 'กรุณาลงนาม waiver ก่อนจอง',
  'common.loading': 'กำลังโหลด…',
  'common.error': 'เกิดข้อผิดพลาด กรุณาลองใหม่',
  'common.success': 'สำเร็จ',
  'common.retry': 'ลองอีกครั้ง',
  'common.required': 'จำเป็น',
  'common.seatsRemaining': 'ที่นั่งเหลือ',
  'common.fromPrice': 'เริ่มต้น',
  'common.full': 'เต็ม',
  'common.aurora': 'ทริปล่าแสงใต้',
  'common.standard': 'มาตรฐาน',
  'common.private': 'ส่วนตัว',
  'common.all': 'ทั้งหมด',
  'common.oneday': 'วันเดียว',
  'common.overnight': 'ค้างคืน',
  'common.multiday': 'หลายวัน',
  'home.stats.trips': '13 ทริป',
  'home.stats.group': 'กลุ่มเล็ก 100%',
  'home.stats.photographers': 'ช่างภาพท้องถิ่น',
  'home.featured': 'ทริปแนะนำ',
  'home.audience.title': 'ทริปนี้เหมาะกับใคร?',
  'home.audience.students': 'นักเรียนไทย',
  'home.audience.residents': 'PR & ผู้พำนัก',
  'home.audience.couples': 'คู่รัก',
  'home.audience.groups': 'กลุ่มเพื่อน',
  'pricing.compare': 'เปรียบเทียบ Standard vs Private',
  'about.positioning': 'เราคือใคร',
  'about.destinations': 'จุดหมายของเรา',
  'about.oshc': 'OSHC และวีซ่า',
  'about.contact': 'ติดต่อ',
  'about.crew': 'พบกับ Saen',
  'about.tips': 'เคล็ดลับ — ล่าแสงออโรร่า',
  'waiver.title': 'ข้อตกลงดิจิทัล',
  'waiver.signName': 'พิมพ์ชื่อ-นามสกุลเป็นลายเซ็นดิจิทัล',
  'lang.toggle': 'EN',
  'validation.email': 'กรุณากรอกอีเมลที่ถูกต้อง',
  'validation.phone': 'ใช้รูปแบบมือถือออสเตรเลีย: 04XX XXX XXX',
  'validation.required': 'กรุณากรอกข้อมูลนี้',
  'validation.waiverClauses': 'กรุณายอมรับข้อตกลงทั้งหมด',
  'booking.rlsError': 'ไม่สามารถบันทึกการจองได้ กรุณาติดต่อ Trip2Talk ทาง Messenger',
  'pin.locked': 'ลองใหม่ใน',
  'pin.invalid': 'PIN ไม่ถูกต้อง',
  'pin.connection': 'เชื่อมต่อไม่สำเร็จ',
  'toast.bookingSuccess': 'ส่งการจองสำเร็จ!',
  'toast.bookingFailed': 'การจองล้มเหลว กรุณาลองใหม่',
  'toast.paymentUpdated': 'อัปเดตสถานะการชำระเงินแล้ว',
  'toast.paymentFailed': 'อัปเดตสถานะไม่สำเร็จ',
  'contact.findUs': 'ติดต่อเรา',
  'contact.facebook': 'Facebook',
  'contact.facebook.sub': 'ติดตามเราได้ที่นี่',
  'contact.messenger': 'Messenger',
  'contact.messenger.sub': 'แชทกับเรา',
  'contact.email': 'อีเมล',
  'contact.email.sub': 'ส่งข้อความถึงเรา',
  'contact.phone': 'โทร',
  'contact.phone.sub': '0452 044 382',
  'contact.line': 'Line',
  'contact.line.sub': 'เพิ่มเพื่อนบน Line',
  'contact.googleReviews': 'Google Reviews',
  'contact.googleReviews.sub': 'ดูรีวิวจากลูกค้า',
}

export const translations: Record<Lang, Map> = { en, th }
