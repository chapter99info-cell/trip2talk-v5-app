export type BilingualText = { en: string; th: string }
export type BilingualList = { en: string[]; th: string[] }

export type TripDetailContent = {
  tagline: BilingualText
  highlights: BilingualList
  includes: BilingualList
  excludes: BilingualList
}

export const TRIP_DETAILS: Record<string, TripDetailContent> = {
  'MEL-4D3N': {
    tagline: {
      en: 'Four seasons in one city — Great Ocean Road golden hour to Pink Lake Milky Way.',
      th: 'สี่ฤดูในเมืองเดียว — จาก Great Ocean Road ยาม Golden Hour ถึง Pink Lake กับทางช้างเผือก',
    },
    highlights: {
      en: ['Great Ocean Road & Twelve Apostles', 'Pink Lake reflections', 'Melbourne city street art'],
      th: ['Great Ocean Road & Twelve Apostles', 'ทะเลสาบสีชมพูสะท้อนแสง', 'สตรีทอาร์ตเมลเบิร์นซิตี้'],
    },
    includes: {
      en: ['SUV with driver & fuel', 'Pro photographer mentor', 'Park entry fees', 'Flight booking assistance'],
      th: ['รถ SUV พร้อมคนขับและน้ำมัน', 'ช่างภาพ Mentor', 'ค่าเข้าอุทยาน', 'ช่วยจองตั๋วเครื่องบิน'],
    },
    excludes: {
      en: ['Flights SYD↔MEL', 'All meals', 'Travel insurance'],
      th: ['ตั๋วเครื่องบินไป-กลับ', 'ค่าอาหารทุกมื้อ', 'ประกันการเดินทาง'],
    },
  },
  'ULU-4D3N': {
    tagline: {
      en: 'Red desert odyssey — Uluru sunrise, Field of Light, and Milky Way skies.',
      th: 'ดินแดนทะเลทรายแดง — พระอาทิตย์ขึ้นอุลูรู Field of Light และท้องฟ้าเต็มดาว',
    },
    highlights: {
      en: ['Uluru sunrise & sunset', 'Field of Light installation', 'Kata Tjuta (The Olgas)'],
      th: ['พระอาทิตย์ขึ้นและตกที่อุลูรู', 'Field of Light', 'Kata Tjuta (The Olgas)'],
    },
    includes: {
      en: ['Vehicle & driver', 'Outback lodge accommodation', 'Uluru-Kata Tjuta park pass', 'Field of Light ticket'],
      th: ['รถและคนขับ', 'ที่พัก Outback Lodge', 'ตั๋วอุทยาน Uluru-Kata Tjuta', 'ตั๋ว Field of Light'],
    },
    excludes: {
      en: ['Flights', 'Meals', 'Travel insurance'],
      th: ['ตั๋วเครื่องบิน', 'ค่าอาหาร', 'ประกันการเดินทาง'],
    },
  },
  'NZ-6D5N': {
    tagline: {
      en: 'The ultimate South Island photo journey — Milford Sound to Lake Tekapo stars.',
      th: 'ทริปถ่ายภาพ South Island สุดพิเศษ — จาก Milford Sound ถึงดาวที่ Lake Tekapo',
    },
    highlights: {
      en: ['Lake Tekapo & Church of the Good Shepherd', 'Milford Sound fiord cruise', 'Queenstown & Southern Alps'],
      th: ['Lake Tekapo & Church of the Good Shepherd', 'ล่องเรือ Milford Sound', 'Queenstown & Southern Alps'],
    },
    includes: {
      en: ['SUV & driver 6 days', '5 nights accommodation', 'Milford Sound cruise', 'Pro photographer'],
      th: ['รถ SUV & คนขับ 6 วัน', 'ที่พัก 5 คืน', 'Milford Sound cruise', 'ช่างภาพมืออาชีพ'],
    },
    excludes: {
      en: ['International/domestic flights', 'Meals', 'Travel insurance'],
      th: ['ตั๋วเครื่องบิน', 'ค่าอาหาร', 'ประกันการเดินทาง'],
    },
  },
  'TAS-3D2N': {
    tagline: {
      en: 'Hobart mini aurora hunt — history, art, and southern lights on Mt Wellington.',
      th: 'ล่าแสงใต้ที่ Hobart — ประวัติศาสตร์ ศิลปะ และแสงออโรร่าบน Mt Wellington',
    },
    highlights: {
      en: ['Mt Wellington aurora hunt', 'Bruny Island full day', 'MONA & Hobart waterfront'],
      th: ['ล่าแสงใต้ Mt Wellington', 'Bruny Island เต็มวัน', 'MONA & ริมน้ำ Hobart'],
    },
    includes: {
      en: ['Private SUV & driver', 'Pro photographer', 'Park entries', 'Flight coordination'],
      th: ['รถ SUV ส่วนตัว & คนขับ', 'ช่างภาพมืออาชีพ', 'ค่าเข้าสถานที่', 'ประสานงานตั๋วเครื่องบิน'],
    },
    excludes: {
      en: ['Flights', 'Meals', 'Travel insurance'],
      th: ['ตั๋วเครื่องบิน', 'ค่าอาหาร', 'ประกันการเดินทาง'],
    },
  },
  'TAS-LH-4D3N': {
    tagline: {
      en: 'Summer Tasmania — lavender fields, Cradle Mountain, and aurora missions.',
      th: 'แทสเมเนียฤดูร้อน — ทุ่งลาเวนเดอร์ Cradle Mountain และภารกิจล่าแสงใต้',
    },
    highlights: {
      en: ['Bridestowe Lavender', 'Cradle Mountain', 'MONA & Mt Wellington aurora'],
      th: ['Bridestowe Lavender', 'Cradle Mountain', 'MONA & ล่าแสงใต้ Mt Wellington'],
    },
    includes: {
      en: ['Vehicle Launceston–Hobart', 'Photographer mentor', 'Lavender & MONA tickets'],
      th: ['รถ Launceston–Hobart', 'ช่างภาพ Mentor', 'ตั๋วลาเวนเดอร์ & MONA'],
    },
    excludes: {
      en: ['Flights', 'Meals', 'Travel insurance'],
      th: ['ตั๋วเครื่องบิน', 'ค่าอาหาร', 'ประกันการเดินทาง'],
    },
  },
  'TAS-SU-4D3N': {
    tagline: {
      en: 'East coast summer highlights — Wineglass Bay, Freycinet, and Bay of Fires.',
      th: 'ไฮไลท์ชายฝั่งตะวันออกฤดูร้อน — Wineglass Bay Freycinet และ Bay of Fires',
    },
    highlights: {
      en: ['Wineglass Bay lookout', 'Freycinet National Park', 'Bay of Fires orange rocks'],
      th: ['Wineglass Bay', 'Freycinet National Park', 'Bay of Fires หินสีส้ม'],
    },
    includes: {
      en: ['Vehicle & driver', 'Pro photographer', 'National park fees'],
      th: ['รถและคนขับ', 'ช่างภาพมืออาชีพ', 'ค่าเข้าอุทยาน'],
    },
    excludes: {
      en: ['Flights', 'Meals', 'Travel insurance'],
      th: ['ตั๋วเครื่องบิน', 'ค่าอาหาร', 'ประกันการเดินทาง'],
    },
  },
  'BER-3D2N': {
    tagline: {
      en: 'NSW south coast drama — Horse Head Rock, Blue Pool, and coastal golden hour.',
      th: 'ชายฝั่งใต้ NSW สุดอลังการ — Horse Head Rock Blue Pool และ Golden Hour',
    },
    highlights: {
      en: ['Horse Head Rock (low tide)', 'Blue Pool Bermagui', 'Wallaga Lake sunsets'],
      th: ['Horse Head Rock (น้ำลง)', 'Blue Pool Bermagui', 'พระอาทิตย์ตก Wallaga Lake'],
    },
    includes: {
      en: ['Transport from Sydney Thai Town', 'Driver & photographer', 'Safety briefing'],
      th: ['รถจาก Sydney Thai Town', 'คนขับและช่างภาพ', 'Safety briefing'],
    },
    excludes: {
      en: ['Meals', 'Travel insurance', 'Rock shoes (bring your own)'],
      th: ['ค่าอาหาร', 'ประกันการเดินทาง', 'รองเท้าปีนเขา (เตรียมเอง)'],
    },
  },
  'CAN-2D1N': {
    tagline: {
      en: 'Spring canola fields — golden blooms near Cowra & Canowindra.',
      th: 'ทุ่งคาโนล่าฤดูใบไม้ผลิ — ดอกเหลืองทองใกล้ Cowra & Canowindra',
    },
    highlights: {
      en: ['Canola field photo spots', 'Cowra & Canowindra old towns', 'Cowra Japanese Garden (optional)'],
      th: ['จุดถ่ายทุ่งคาโนล่า', 'เมืองเก่า Cowra & Canowindra', 'สวนญี่ปุ่น Cowra (ทางเลือก)'],
    },
    includes: {
      en: ['1 night dorm accommodation', 'Vehicle & driver', 'Pro photographer'],
      th: ['ที่พัก 1 คืน (ห้องรวม)', 'รถและคนขับ', 'ช่างภาพมืออาชีพ'],
    },
    excludes: {
      en: ['Meals', 'Japanese Garden entry', 'Travel insurance'],
      th: ['ค่าอาหาร', 'ค่าเข้าสวนญี่ปุ่น', 'ประกันการเดินทาง'],
    },
  },
  'KIA-1DAY': {
    tagline: {
      en: 'Winter coastal day trip — Helensburgh Station to Bombo Headland.',
      th: 'ทริปวันเดียวชายฝั่งฤดูหนาว — จาก Helensburgh Station ถึง Bombo Headland',
    },
    highlights: {
      en: ['Helensburgh Old Station', 'Seacliff Bridge', 'Bombo Headland Quarry'],
      th: ['Helensburgh Old Station', 'Seacliff Bridge', 'Bombo Headland Quarry'],
    },
    includes: {
      en: ['Pickup Sydney Thai Town', 'Driver & photographer', 'Drinking water'],
      th: ['รับ-ส่ง Sydney Thai Town', 'คนขับและช่างภาพ', 'น้ำดื่ม'],
    },
    excludes: {
      en: ['Meals', 'Travel insurance'],
      th: ['ค่าอาหาร', 'ประกันการเดินทาง'],
    },
  },
  'PSP-1DAY': {
    tagline: {
      en: 'Blue Mountains day escape — Three Sisters and sunset lookouts.',
      th: 'ทริปวันเดียว Blue Mountains — Three Sisters และจุดชมพระอาทิตย์ตก',
    },
    highlights: {
      en: ['Three Sisters Echo Point', 'Govetts Leap', 'Sunset lookouts'],
      th: ['Three Sisters Echo Point', 'Govetts Leap', 'จุดชมพระอาทิตย์ตก'],
    },
    includes: {
      en: ['Transport & driver', 'Pro photographer', 'National park stops'],
      th: ['รถและคนขับ', 'ช่างภาพมืออาชีพ', 'แวะอุทยานแห่งชาติ'],
    },
    excludes: {
      en: ['Meals', 'Scenic World tickets (optional)', 'Travel insurance'],
      th: ['ค่าอาหาร', 'ตั๋ว Scenic World (ทางเลือก)', 'ประกันการเดินทาง'],
    },
  },
  'LAV-ANB-1D': {
    tagline: {
      en: 'Anna Bay dunes & coastal portraits — golden hour by the sea.',
      th: 'เนินทราย Anna Bay & ถ่ายภาพริมทะเล — Golden Hour ริมชายหาด',
    },
    highlights: {
      en: ['Anna Bay sand dunes', 'Coastal portrait locations', 'Golden hour session'],
      th: ['เนินทราย Anna Bay', 'มุมถ่ายภาพริมชายหาด', 'Golden hour'],
    },
    includes: {
      en: ['Transport & driver', 'Pro photographer', 'Drone (where permitted)'],
      th: ['รถและคนขับ', 'ช่างภาพมืออาชีพ', 'โดรน (ตามกฎหมาย)'],
    },
    excludes: {
      en: ['Meals', 'Travel insurance'],
      th: ['ค่าอาหาร', 'ประกันการเดินทาง'],
    },
  },
  'SYD-MW-WIN': {
    tagline: {
      en: 'Winter Milky Way hunt — dark sky portraits around Sydney.',
      th: 'ล่าทางช้างเผือกฤดูหนาว — ถ่ายภาพท้องฟ้ามืดรอบซิดนีย์',
    },
    highlights: {
      en: ['Dark sky locations', 'Milky Way portraits', 'Astro camera coaching'],
      th: ['จุดท้องฟ้ามืด', 'ถ่ายภาพกับทางช้างเผือก', 'โค้ชตั้งค่ากล้องดาราศาสตร์'],
    },
    includes: {
      en: ['Evening transport', 'Pro photographer', 'Tripod guidance'],
      th: ['รถช่วงเย็น', 'ช่างภาพมืออาชีพ', 'แนะนำการใช้ขาตั้ง'],
    },
    excludes: {
      en: ['Meals', 'Travel insurance', 'Warm clothing (bring layers)'],
      th: ['ค่าอาหาร', 'ประกันการเดินทาง', 'เสื้อกันหนาว (เตรียมเอง)'],
    },
  },
  'SYD-1DAY': {
    tagline: {
      en: 'Sydney hidden gems — city icons, Anna Bay dunes, or Milky Way packages.',
      th: 'มุมลับซิดนีย์ — แลนด์มาร์กเมือง เนินทราย Anna Bay หรือแพ็กล่าทางช้างเผือก',
    },
    highlights: {
      en: ['Sydney 5 best photo locations', 'Anna Bay sand dunes', 'Milky Way hunt (winter)'],
      th: ['5 จุดถ่ายภาพซิดนีย์', 'เนินทราย Anna Bay', 'ล่าทางช้างเผือก (ฤดูหนาว)'],
    },
    includes: {
      en: ['Vehicle & driver', 'Pro photographer', 'Drone on select packages'],
      th: ['รถและคนขับ', 'ช่างภาพมืออาชีพ', 'โดรนในแพ็กที่กำหนด'],
    },
    excludes: {
      en: ['Meals', 'Travel insurance', 'Influencer package extras'],
      th: ['ค่าอาหาร', 'ประกันการเดินทาง', 'ค่าใช้จ่ายแพ็ก Influencer เพิ่มเติม'],
    },
  },
}

export function getTripDetails(tripCode: string): TripDetailContent | undefined {
  return TRIP_DETAILS[tripCode.toUpperCase()]
}

export function textFor(item: BilingualText, lang: 'en' | 'th'): string {
  return lang === 'th' ? item.th : item.en
}

export function listFor(item: BilingualList, lang: 'en' | 'th'): string[] {
  return lang === 'th' ? item.th : item.en
}

/** @deprecated use textFor / listFor */
export function pickBilingual(item: BilingualText, lang: 'en' | 'th'): string
export function pickBilingual(item: BilingualList, lang: 'en' | 'th'): string[]
export function pickBilingual(item: BilingualText | BilingualList, lang: 'en' | 'th') {
  if ('en' in item && typeof item.en === 'string') return textFor(item as BilingualText, lang)
  return listFor(item as BilingualList, lang)
}
