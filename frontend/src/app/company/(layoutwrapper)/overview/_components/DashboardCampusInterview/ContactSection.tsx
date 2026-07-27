import { Mail, Phone, Contact } from "lucide-react";

const ContactSection = () => {
  return (
    <div className="rounded-xl bg-white p-5">
      <div className="flex items-center gap-2 mb-4">
        <Contact size={18} className="!text-[#0621B7]" />
        <h3 className="text-xl font-bold text-foreground !text-[18px] leading-[28px] text-[#101828] font-thin">Contact</h3>
      </div>
      <p className="!text-[14px] leading-[20px] !text-[#4A5565] font-normal mb-[24px]">
        For any questions or feedback feel free to contact us.<br />
        We are here to help you!
      </p>
      <div className="space-y-3">
        <a href={`mailto:campusinterview@ethjuniors.ch?subject="subject"`} className="flex items-center gap-3 hover:underline !text-[14px] leading-[20px] !text-[#0621B7] font-normal">
        <div className="flex flex-row justify-center items-center w-[40px] h-[40px] bg-gray-100 rounded-[14px] flex-none">
          <Mail size={16} className="shrink-0 !text-[#0621B7]" />
      </div>

          campusinterview@ethjuniors.ch
        </a>
        <a href="tel:+41446326638" className="flex items-center gap-3 hover:underline !text-[14px] leading-[20px] !text-[#0621B7] font-normal">
        <div className="flex flex-row justify-center items-center w-[40px] h-[40px] bg-gray-100 rounded-[14px] flex-none">
          <Phone size={16} className="shrink-0" />
      </div>

          +41 44 632 66 38
        </a>
      </div>
    </div>
  );
};

export default ContactSection;
