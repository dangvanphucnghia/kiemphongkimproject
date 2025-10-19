type Props = {
  logo: string;
  title: string;
  desc: string;
  hsd: string;
  code: string;
};

export default function VoucherCard({ logo, title, desc, hsd, code }: Props) {
  return (
    <div className="relative bg-white rounded-lg shadow overflow-hidden grid grid-cols-[120px_1fr]">
      {/* mép tem răng cưa */}
      <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-transparent via-gray-100 to-transparent [mask:linear-gradient(#000_0_0)_left/6px_16px_repeat-y]" />

      {/* logo */}
      <div className="flex items-center justify-center p-4">
        <img src={logo} alt="logo" className="h-16 w-16 object-contain" />
      </div>

      {/* nội dung */}
      <div className="p-4">
        <h3 className="font-semibold text-[#0C2E4E]">{title}</h3>
        <p className="text-sm text-[#0C2E4E]/80 mt-1 line-clamp-2">{desc}</p>

        <div className="mt-2 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-[#F4E04D] text-[#0C2E4E] text-xs font-semibold px-3 py-1">
            HSD {hsd}
          </span>
          <a href="#" className="text-[#0C2E4E] underline text-sm">
            Điều kiện khuyến mại
          </a>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-[#0C2E4E]">{code}</span>
          <button className="bg-[#F4E04D] text-[#0C2E4E] font-semibold px-4 py-2 rounded-md hover:bg-[#E9C924] transition">
            Lấy ngay
          </button>
        </div>
      </div>
    </div>
  );
}
