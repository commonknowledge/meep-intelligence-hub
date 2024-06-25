import {
  DataSourceType,
  GetLocalDataQuery,
  Person,
} from "@/__generated__/graphql";
import { formatDate, formatRelative, isAfter, isBefore } from "date-fns";
import { Ticket } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-rounded";
import { useMemo, useState } from "react";
import { HustingsCTA } from "@/app/hub/render/[hostname]/map/SearchPanel";
import Link from "next/link";
import IframeResizer from "iframe-resizer-react";
import queryString from "query-string";
import { useHubRenderContext } from "./HubRenderContext";
import { BACKEND_URL } from "@/env";
import { EventCard } from "./EventCard";

export function ConstituencyView({ data }: { data: GetLocalDataQuery['postcodeSearch']['constituency'] }) {
  const [tab, setTab] = useState("events");
  const hubContext = useHubRenderContext()

  if (!data?.name) {
    return (
      <div className='p-6'>
        <a
          href="#"
          className="block mb-2"
          onClick={(e) => {
            e.preventDefault();
            hubContext.reset()
          }}
        >
          &larr; Search another postcode
        </a>
        <div>This doesn{"'"}t look like a valid postcode.</div>
      </div>
    );
  }

  const events = useMemo(() => {
    // Give me a flat list of events
    const allData = data.genericDataForHub
      .filter(d => d.source.dataType === DataSourceType.Event)
      .flatMap((d) => d.data || []);

    return allData.filter((d) => !!d.startTime);
  }, [data.genericDataForHub])

  .sort((a, b) =>
    // most recent first
    isAfter(new Date(a.startTime), new Date(b.startTime))
      ? 1
      : -1
  )

  const upcomingEvents = events?.filter((e) =>
    // future events
    isAfter(new Date(e.startTime), new Date())
  );

  const pastEvents = events?.filter((e) =>
    // future events
    isBefore(new Date(e.startTime), new Date())
  );

  const postcode = data?.samplePostcode?.postcode?.trim().replace(/([\s ]*)/mig, "");

  return (
    <div className='flex flex-col overflow-y-hidden'>
      <header className="mb-4 pt-6 px-6">
        <a
          href="#"
          className="block mb-4"
          onClick={(e) => {
            e.preventDefault();
            hubContext.reset()
          }}
        >
          &larr; Search another postcode
        </a>
        <h2 className="text-3xl text-hub-primary-950 font-bold">
          {data?.name}
        </h2>
      </header>
      <main>
        <Tabs
          value={tab}
          onValueChange={setTab}
          className="flex flex-col max-h-full overflow-hidden items-stretch justify-start"
        >
          <TabsList className="px-6 py-4 mb-4 border-none w-full justify-start gap-2">
            {[
              {
                label: "Calendar",
                key: "events"
              }, 
              {
                label: hubContext.hostname === 'peopleclimatenature.org' ? "Message your candidates 💬" : "Candidates",
                key: "candidates"
              }
            ].map((target) => (
              <TabsTrigger
                key={target.key}
                value={target.key}
                className="rounded text-hub-primary-600 bg-none hover:bg-hub-primary-50 data-[state=active]:bg-hub-primary-50 data-[state=active]:text-hub-primary-600 data-[state=active]:shadow-none"
              >
                {target.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="w-full border-b border-meepGray-200"></div>
          <TabsContent className="mt-0" value="events">
            {!!upcomingEvents?.length ? (
              <>
                <section className='px-6 my-6'>
                  <header className="mb-4">
                    Help the campaign in {data?.name}{" "}
                    by coming along to one of these upcoming events.
                  </header>
                  <main className="space-y-4">
                    {upcomingEvents.map((e) => (
                      <EventCard key={e.id} event={e} />
                    ))}
                  </main>
                </section>
                {hubContext.hostname === 'peopleclimatenature.org' && (
                  <>
                    <div className="w-full border-b border-meepGray-200 my-6"></div>
                    <div className="flex flex-col gap-2 text-hub-primary-neutral px-6 my-6">
                      <HustingsCTA />
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <section className='px-6 pb-0 my-6'>
                  <p className='mb-4'>
                    No upcoming events in {data?.name}.
                  </p>
                  {hubContext.hostname === 'peopleclimatenature.org' && (
                    <div className="flex flex-col gap-2 text-hub-primary-neutral mt-4">
                      <HustingsCTA />
                    </div>
                  )}
                </section>
              </>
            )}
            {hubContext.hostname === 'peopleclimatenature.org' && (
              <>
                <div className="w-full border-b border-meepGray-200 my-6"></div>
                <div className="flex flex-col gap-2 text-hub-primary-neutral px-6 my-6">
                    <h3 className='font-bold'>Other ways to get involved</h3>
                    <p>There are lots of easy ways you can show your candidates you care about people, climate and nature. Take a look at this page here to find out more.</p>
                    <Link href="/get-involved" className='text-hub-primary-600 font-bold'>Learn more &rarr;</Link>
                </div>
              </>
            )}
            {!!pastEvents.length && (
              <>
                <div className="w-full border-b border-meepGray-200 my-6"></div>
                <section className='px-6 my-6'>
                  <header className="mb-4">
                    Past events in {data?.name}.
                  </header>
                  <main className="space-y-4">
                    {pastEvents.map((e) => (
                      <EventCard key={e.id} event={e} />
                    ))}
                  </main>
                </section>
              </>
            )}
          </TabsContent>
          <TabsContent className="mt-0" value="candidates">
            <section className="space-y-4">
              {hubContext.hostname === 'peopleclimatenature.org' ? (
                <IframeResizer
                  src={queryString.stringifyUrl({
                    url: 'https://peopleclimatenature.onldspk.cc/ge2024-candidates/frame/write',
                    query: {
                      body: "VqQTqd",
                      pc: postcode
                    }
                  })}
                  width={'100%'}
                />
              ) : (
                <div className='space-y-3 my-4'>
                  {data?.ppcs.slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((person) => (
                    <article
                      key={person.id}
                      className="border-2 border-meepGray-200 rounded-md overflow-hidden p-4 flex flex-col gap-2 mx-4"
                    >
                      <header>
                        <div className="flex items-center">
                          {person.photo && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={new URL(
                                person.photo.url,
                                BACKEND_URL
                              ).toString()}
                              alt={person.name}
                              width={41}
                              height={41}
                              className="rounded-full mr-4"
                            />
                          )}
                          <h3 className="font-bold text-lg">{person.name}</h3>
                          {person.party && (
                            <span className="border-l border-x-meepGray-400 pl-2 ml-auto">
                              {person.party.name}
                            </span>
                          )}
                        </div>
                      </header>
                      {person.email ? (
                        <a
                          href={`mailto:${person.email.data?.replace(/["']/img, "")}`}
                          target="_blank"
                          className="bg-hub-primary-200 text-hub-primary-900 px-3 py-2 text-center w-full block rounded-md"
                        >
                          Email Candidate
                        </a>
                      ) : (
                        <span className="bg-meepGray-200 text-hub-primary-900 px-3 py-2 text-center w-full block rounded-md">
                          No Email Address Yet
                        </span>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
