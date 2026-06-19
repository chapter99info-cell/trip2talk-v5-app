import { useLang } from '../../hooks/useLang'
import { AURORA_DISCLAIMER } from '../../data/risks'

export default function AboutPage() {
  const { lang, t } = useLang()

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
        <h2 className="text-lg font-semibold text-brand-dark">{t('about.crew')}</h2>
        <div className="mt-4 flex gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-green text-xl text-white">
            S
          </div>
          <div>
            <p className="font-semibold text-brand-dark">Saen</p>
            <p className="text-sm text-brand-green">
              {lang === 'th' ? 'ผู้ก่อตั้ง & ช่างภาพ' : 'Founder & Photographer'}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {lang === 'th'
                ? 'ประสบการณ์ 10+ ปี ถ่ายภาพท่องเที่ยวไทย-ออสเตรเลีย ก่อตั้ง Trip2Talk เพื่อกลุ่มเล็กที่ต้องการ Mentor จริง'
                : '10+ years photographing Thai-Australian travel. Founded Trip2Talk for small groups who want a real mentor.'}
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
    </div>
  )
}
