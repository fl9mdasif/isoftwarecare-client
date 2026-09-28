import Link from "next/link";
import { Icon, resolveServiceIcon } from "@/components/ui/Icon";
import { cld } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import type { TService } from "@/types";

export function ServiceCard({ service, index, wide }: { service: TService; index: number; wide?: boolean }) {
  const iconIsImage = !!service.icon && /^https?:\/\//.test(service.icon);

  return (
    <Link href={`/services/${service.slug}`} className={cn("svc", wide && "wide")} data-spot>
      <span className="num">{String(index + 1).padStart(2, "0")}</span>
      <div className="svc-ico">
        {iconIsImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cld(service.icon, { w: 64, crop: "fit" })} alt="" width={24} height={24} loading="lazy" />
        ) : (
          <Icon name={resolveServiceIcon(service.icon, service.slug)} strokeWidth={1.7} />
        )}
      </div>
      <h3>{service.title}</h3>
      <p>{service.shortDescription}</p>
      <span className="svc-more">
        Learn more <Icon name="arrow" strokeWidth={2} />
      </span>
    </Link>
  );
}

export function ServicesGrid({ services }: { services: TService[] }) {
  return (
    <div className="svc-grid">
      {services.map((s, i) => (
        <ServiceCard key={s._id} service={s} index={i} wide={i === 0} />
      ))}
    </div>
  );
}
