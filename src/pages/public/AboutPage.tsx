import { Mail, MessageCircle } from 'lucide-react'
import { useLang } from '../../hooks/useLang'
import { AURORA_DISCLAIMER } from '../../data/risks'

export default function AboutPage() {
  const { lang, t } = useLang()

  const positioning =
    lang === 'th'
      ? 'Trip2Talk คือทริปถ่ายภาพส่วนตัวสำหรับนักเรียนไทยและผู้มีถิ่นที่อยู่ถาวร (PR) ในออสเตรเลีย — กลุ่มเล็ก พร้อมช่างภาพ Mentor สองภาษา ไทย/อังกฤษ เราออกเดินทางครอบคลุมนิวซีแลนด์ แทสเมเนีย เทือกเขาศักดิ์สิทธิ์ (อุลูรู) ซิดนีย์ และ NSW ชนบท'
      : 'Trip2Talk runs private photo journeys for Thai students and PR residents in Australia — small groups with a bilingual TH/EN photographer mentor. We cover New Zealand, Tasmania, the Northern Territory (Uluru), Sydney, and regional NSW.'

  const destinations =
    lang === 'th'
      ? ['นิวซีแลนด์ — South Island', 'แทสเมเนีย — Aurora & wilderness', 'Northern Territory — อุลูรู', 'ซิดนีย์ — Milky Way & day trips', 'NSW ชนบท — Bermagui, Cowra, Kiama']
      : ['New Zealand — South Island', 'Tasmania — aurora & wilderness', 'Northern Territory — Uluru', 'Sydney — Milky Way & day trips', 'Regional NSW — Bermagui, Cowra, Kiama']

  const oshc =
    lang === 'th'
      ? 'เราช่วยประสานงาน OSHC สำหรับผู้ถือวีซ่านักเรียน — ตรวจความครอบคลุมก่อนออกทริป แจ้งข้อกำหนด waiver และเอกสารที่ต้องใช้ เพื่อให้การเดินทางสอดคล้องกับเงื่อนไขวีซ่า'
      : 'We help student visa holders stay compliant — OSHC coverage checks before departure, clear waiver steps, and paperwork guidance so your trip aligns with visa conditions.'

  const tips =
    lang === 'th'
      ? [
          'ตรวจ KP index ก่อนออก — ค่า 3+ มีโอกาสเห็นแสงใต้ในแทสเมเนีย',
          'หลบเมฆไปยังชายฝั่งตะวันออกเมื่อ Hobart มีเมฆหนา',
          'ตั้งกล้อง ISO 1600–3200, รูปรับ 10–20 วินาที, ใช้ขาตั้งแน่น',
          'เตรียมชั้นกันหนาว — ยอดเขาอาจต่ำกว่า 0°C',
        ]
      : [
          'Check KP index before departure — 3+ improves Tasmania aurora odds',
          'Escape cloud cover to the east coast when Hobart is overcast',
          'Camera settings: ISO 1600–3200, 10–20s exposure, sturdy tripod',
          'Pack thermal layers — summit temps can drop below 0°C',
        ]

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-brand-dark">{t('nav.about')}</h1>

      <section className="rounded-2xl border border-gray-100 bg-brand-green-light p-5">
        <h2 className="text-lg font-semibold text-brand-dark">{t('about.positioning')}</h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">{positioning}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-brand-dark">{t('about.destinations')}</h2>
        <ul className="mt-3 space-y-2">
          {destinations.map((d) => (
            <li key={d} className="rounded-xl bg-gray-50 px-4 py-2.5 text-sm text-brand-dark">
              · {d}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-brand-green/20 bg-white p-5">
        <h2 className="text-lg font-semibold text-brand-dark">{t('about.oshc')}</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">{oshc}</p>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-brand-green-light p-5">
        <h2 className="text-lg font-semibold text-brand-dark">{t('about.crew')}</h2>
        <div className="mt-4 flex gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-green text-xl text-white">
            S
          </div>
          <div>
            <p className="font-semibold text-brand-dark">Saen</p>
            <p className="text-sm text-brand-green">
              {lang === 'th' ? 'ผู้ก่อตั้ง & ช่างภาพ' : 'Founder & Lead Photographer'}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {lang === 'th'
                ? 'ประสบการณ์ถ่ายภาพท่องเที่ยวไทย-ออสเตรเลียกว่า 10 ปี ก่อตั้ง Trip2Talk เพื่อกลุ่มเล็กที่ต้องการ Mentor จริง — ไม่ใช่ทัวร์หมู่ทั่วไป'
                : '10+ years photographing Thai-Australian travel. Saen founded Trip2Talk for small groups who want a real mentor — not a generic bus tour.'}
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-brand-dark">{t('about.tips')}</h2>
        <p className="mt-2 text-sm text-gray-600">{AURORA_DISCLAIMER[lang]}</p>
        <ul className="mt-4 space-y-3">
          {tips.map((tip) => (
            <li key={tip} className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-brand-dark">
              · {tip}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
        <h2 className="text-lg font-semibold text-brand-dark">{t('about.contact')}</h2>
        <p className="mt-2 text-sm text-gray-600">
          {lang === 'th'
            ? 'สอบถามทริป ราคา Private หรือการจอง — ติดต่อเราได้ทางอีเมลหรือ Messenger'
            : 'Questions about trips, private pricing, or bookings — reach us by email or Messenger.'}
        </p>
        <div className="mt-4 space-y-2 text-sm">
          <a
            href="mailto:hello@trip2talk.com.au"
            className="flex items-center gap-2 text-brand-green hover:underline"
          >
            <Mail className="h-4 w-4" />
            hello@trip2talk.com.au
          </a>
          <a
            href="https://m.me/trip2talk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-brand-green hover:underline"
          >
            <MessageCircle className="h-4 w-4" />
            Messenger — Trip2Talk
          </a>
        </div>
      </section>
    </div>
  )
}
