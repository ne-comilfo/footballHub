import { FaGithub, FaTelegram, FaEnvelope } from "react-icons/fa";

const linkClass = 'flex gap-2 text-lg items-center minw-w-32';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 py-6 border-t">
      <div className="text-xl font-bold">Контакты</div>

      <div className="flex gap-6">
        <a href="mailto:grisha.malyshev.06@bk.ru" className={linkClass}>
          <FaEnvelope size={24} /> Email
        </a>

        <a href="https://github.com/ne-comilfo" className={linkClass}>
          <FaGithub size={24} /> Github
        </a>

        <a href="https://t.me/ne_com1lfo" className={linkClass}>
          <FaTelegram size={24} /> Telegram
        </a>
      </div>
    </footer>
  );
}
