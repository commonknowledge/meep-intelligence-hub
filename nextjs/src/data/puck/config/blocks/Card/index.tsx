/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig, Field, Fields } from "@measured/puck";

import CirclePattern from "../../../../../../public/hub/circle-pattern.svg";
import Image from "next/image";
import ArrowTopRight from "../../../../../../public/hub/arrow-top-right.svg";
import Link from "next/link";
import { PuckText } from "../../components/PuckText"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { Download, FileHeart } from "lucide-react";



import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { itemTypes } from "../FilterableGrid/cardTypes";

const icons = Object.keys(dynamicIconImports).reduce((acc, iconName) => {
  // @ts-ignore
  const El = dynamic(dynamicIconImports[iconName]);

  return {
    ...acc,
    [iconName]: <El />,
  };
}, {});

const iconOptions = Object.keys(dynamicIconImports).map((iconName) => ({
  label: iconName,
  value: iconName,
}));

export type CardProps = {
  category?: string
  title: string;
  behaviour: string;
  dialogDescription?: string;
  description?: string;
  type: typeof itemTypes[number]["value"] | "illustration";
  link?: string;
  linkLabel?: string;
  src?: any
  eventMonth?: string;
  eventDay?: string;
  eventTime?: string;
  eventLocation?: string;
  imageUrl?: string;
  // columns: number;
  // rows: number;
};

const TypeBadge = ({ type }: { type: string }) => {
  return (
    <div>
      <div className="uppercase text-sm inline-block text-jungle-green-700 bg-jungle-green-100 font-normal rounded-full py-1 px-3">{type}</div>
    </div>
  );
}




export const Card: ComponentConfig<CardProps> = {
  resolveFields: (data) => {
    const fields: Fields<CardProps> = {
      type: {
        type: "select",
        options: itemTypes,
      },
      behaviour: {
        type: "select",
        options: [
          { label: "Link", value: "link" },
          { label: "Dialog", value: "dialog" },
          { label: "No action", value: "nothing" },
        ],
      },
      title: {
        type: "text"
      },
      description: {
        type: "textarea",
      },
      dialogDescription: {
        // @ts-ignore
        visible: data.props.behaviour === "dialog",
        label: "Visible when clicked",
        type: "textarea",
      },
      link: {
        // @ts-ignore
        visible: data.props.behaviour !== "nothing",
        type: "text",
      },
      linkLabel: {
        // @ts-ignore
        visible: data.props.behaviour === "dialog",
        type: "text",
      },
      // columns: {
      //   type: "number",
      //   min: 1,
      //   max: 2,
      // },
      // rows: {
      //   type: "number",
      //   min: 1,
      //   max: 2,
      // }
    }

    for (const key of Object.keys(fields)) {
      // @ts-ignore
      if (fields[key].visible === false) {
        // @ts-ignore
        delete fields[key]
      }
    }

    return fields
  },
  defaultProps: {
    title: "Heading",
    dialogDescription: "",
    description: "Dignissimos et eos fugiat. Facere aliquam corrupti est voluptatem veritatis amet id. Nam repudiandae accusamus illum voluptatibus similique consequuntur. Impedit ut rerum quae. Dolore qui mollitia occaecati soluta numquam. Non corrupti mollitia libero aut atque quibusdam tenetur.",
    type: "resource",
    link: "www.google.com",
    linkLabel: "Learn more",
    behaviour: "link",
    // columns: 1,
    // rows: 1
  },
  resolveData: (data, { lastData }) => {
    return {
      ...data,
      props: {
        ...data.props,
        linkLabel: data.props.type === lastData?.props?.type ? data.props.linkLabel : (
          data.props.type === "resource" ? "Download" : "Learn more"
        )
      }
    }
  },
  render: props => <RenderCard {...props} />,
};

export function RenderCard({ src, category, title, description, dialogDescription, type, link, linkLabel, behaviour, eventMonth, eventDay, eventTime, eventLocation, imageUrl }: CardProps) {
  const card = type !== "illustration" ? (
    <div
      className="render-card w-full h-full aspect-square overflow-clip rounded-[20px] flex flex-col gap-5 hover:shadow-hover transition-all"
    // style={{
    //   gridColumn: `span ${columns}`,
    //   gridRow: `span ${rows}`,
    // }}
    >
      {type === "resource" && (
        <div className="p-5 bg-white h-full flex flex-col gap-4 justify-between">
          <div className="text-jungle-green-600 w-full object-scale-down object-left ">
            {imageUrl ? <img src={imageUrl} alt="resource image" className='rounded-[10px] h-40' /> : <FileHeart strokeWidth="1.5" className="h-10 w-10"/>}

          </div>
          <div>
            <h2 className="lg:text-hub2xl text-hubxl mb-3">{title}</h2>
            {description && <div className="text-jungle-green-neutral line-clamp-6">
              <PuckText text={description} />
            </div>}
          </div>
          <TypeBadge type={type} />
        </div>
      )}

      {type === "action" && (
        <div className="p-5 bg-jungle-green-600 text-white h-full relative flex flex-col gap-4 justify-between">
          <Image src={ArrowTopRight} width={30} alt="arrow" className='relative z-10' />
          <div>
            <h2 className="lg:text-hub2xl text-hubxl tracking-tight relative z-10 mb-3">{title}</h2>
            {description && (
              <div className="text-white line-clamp-6 relative z-10">
                <PuckText text={description} />
              </div>
            )}
          </div>
          <div className='relative z-10'>
            <TypeBadge type={type} />
          </div>
          <Image
            className="object-cover rounded-[40px] absolute top-0 left-0 opacity-50"
            src={CirclePattern}
            width={500}
            alt="hero image"
            layout="responsive"
          />
        </div>
      )}

      {type === "event" && (
        <div className="p-5 bg-jungle-green-50 text-jungle-green-800 h-full relative flex flex-col gap-4 justify-between">
          <div className="flex justify-between align-middle text-jungle-green-600">
            <div className=" flex flex-col items-center">
              {eventMonth}
              <p className="text-4xl">{eventDay}</p>

            </div>
            <div className="text-right">
              <p>{eventTime}</p>
              <p>{eventLocation}</p>
            </div>
          </div>
          <div>
            <h2 className="lg:text-hub2xl text-hubxl tracking-tight relative z-10 mb-3">{title}</h2>
            {description && (
              <div className="line-clamp-6 relative z-10">
                <PuckText text={description} />
              </div>
            )}
          </div>
          <div className='relative z-10'>
            <TypeBadge type={type} />
          </div>

        </div>
      )}
    </div>
  ) : (
    <div className="relative">
      <Image src={src} alt="illustration" className='w-full h-full overflow-visible absolute' style={{
        objectFit: "contain",
      }} />
    </div>
    )
      

  if (behaviour === "dialog" && !!dialogDescription) {
    return (
      <Dialog>
        <DialogTrigger className="w-full h-full text-left">
          {card}
        </DialogTrigger>
        <DialogContent className="p-10 bg-white text-jungle-green-900 max-h-[100dvh] md:max-h-[95dvh] overflow-y-auto">
          <DialogHeader className="flex flex-col gap-5 text-left">
            <DialogTitle className="text-5xl">{title}</DialogTitle>
            <DialogDescription className=" text-lg">
              <PuckText text={dialogDescription} />
            </DialogDescription>
            {!!link && (
              <Link href={link}
                className='bg-jungle-green-600 hover:bg-jungle-green-500 text-white text-lg font-bold rounded-md p-4 flex flex-row gap-4 text-center items-center justify-center'
              >
                {type === "resource" && <Download />}
                {linkLabel || "Learn more"}
              </Link>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return link ? (
    <Link href={link}>
      {card}
    </Link>
  ) : card
}