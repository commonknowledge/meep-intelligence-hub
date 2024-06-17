"use client"

import React from 'react'

import logo from "../../../../../public/hub/logo.svg";
import Image from 'next/image'
// @ts-ignore
import * as CookieConsent from "vanilla-cookieconsent"

export default function HubFooter() {
  return (
    <div className="mb-[20px] w-full h-full bg-white rounded-[20px] text-jungle-green-neutral p-8 space-y-10">
      <div className="flex md:flex-row flex-col items-start justify-between md:items-center gap-10">
        <div className="flex md:flex-row flex-col gap-5">
          <Image src={logo} width={180} height={100} alt="logo" />
          <p className='max-w-sm'>
            United for People, Climate and Nature is a campaign developed by The Climate Coalition. <a href='http://theclimatecoalition.org/about' className='underline'>Learn more about us here.</a>
          </p>
        </div>
        <div className=" flex flex-col gap-5 items-end" >
          <p className="hidden md:block  text-sm justify-between uppercase">Navigation</p>
          <div className='flex flex-col  md:text-right gap-1'>
            <p><a className='underline' href="/">Home</a></p>
            <p><a className='underline' href="/get-involved">Get Involved</a></p>
            <p><a className='underline' href="/map">Near Me</a></p>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-10 text-sm md:text-right border-t border-neutral-100 pt-5 justify-between ">
        <div className="flex md:flex-row flex-col  gap-5">
          <p>
            <span className='underline' onClick={() => { CookieConsent.showPreferences() }}>Manage cookie consent</span>
          </p>
          <p>
            <a className='underline' href='https://www.theclimatecoalition.org/privacy-policy'>Privacy Policy</a>
          </p>
          <p>
            <a className='underline' href='https://www.theclimatecoalition.org/cookie-policy'>Cookie Policy</a>
          </p>
        </div>
        <p>
          Built with <a className='underline' href='https://prototype.mapped.commonknowledge.coop'>Mapped</a> by <a className='underline' href='https://commonknowledge.coop'>Common Knowledge</a>
        </p>
      </div>
    </div>
  )
}
