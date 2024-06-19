import {
  DataSourceType,
  GetLocalDataQuery,
  Person,
} from "@/__generated__/graphql";
import { formatDate, formatRelative, isAfter } from "date-fns";
import { Ticket } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-rounded";
import { useState } from "react";
import { HustingsCTA } from "@/app/hub/render/[hostname]/map/[[...slugs]]/SearchPanel";
import Link from "next/link";
import IframeResizer from "iframe-resizer-react";
import queryString from "query-string";

export function ConstituencyView({ data }: { data: GetLocalDataQuery['postcodeSearch']['constituency'] }) {
  const [tab, setTab] = useState("events");

  if (!data?.name) {
    return (
      <div className='p-6'>
        <a
          href="#"
          className="block mb-2"
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState(null, "", "/map");
          }}
        >
          &larr; Search another postcode
        </a>
        <div>This doesn{"'"}t look like a valid postcode.</div>
      </div>
    );
  }

  const events = data?.genericDataForHub?.filter(
    (d) =>
      // event type
      d.dataType.dataSet.externalDataSource.dataType === DataSourceType.Event &&
      // future events
      isAfter(new Date(d.startTime), new Date())
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
            window.history.pushState(null, "", "/map");
          }}
        >
          &larr; Search another postcode
        </a>
        <h2 className="text-3xl text-green-950 font-bold">
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
                label: "Message your candidates 💬",
                key: "candidates"
              }
            ].map((target) => (
              <TabsTrigger
                key={target.key}
                value={target.key}
                className="rounded text-jungle-green-600 bg-none hover:bg-jungle-green-50 data-[state=active]:bg-jungle-green-50 data-[state=active]:text-jungle-green-600 data-[state=active]:shadow-none"
              >
                {target.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="w-full border-b border-meepGray-200"></div>
          <TabsContent className="mt-0" value="events">
            {events && events.length ? (
              <div className='px-6 py-6'>
                <div className="mb-4">
                  Help the campaign in {data?.name}{" "}
                  by coming along to one of these upcoming events.
                </div>
                <section className="space-y-4">
                  {events
                    .sort((a, b) =>
                      // most recent first
                      isAfter(new Date(a.startTime), new Date(b.startTime))
                        ? 1
                        : -1
                    )
                    .map((i: any) => (
                      <article
                        key={i.id}
                        className="border-2 border-meepGray-200 rounded-md overflow-hidden p-4 flex flex-col gap-2"
                      >
                        <header>
                          <div className="text-meepGray-500">
                            {formatRelative(new Date(i.startTime), new Date())}
                          </div>
                          <h3 className="font-bold text-lg">{i.title}</h3>
                        </header>
                        <div className="grid grid-cols-2">
                          <div>
                            <div className="text-meepGray-500 text-sm">Date/Time</div>
                            <div>{formatDate(i.startTime, "EE do MMM")}</div>
                          </div>
                          <div>
                            <div className="text-meepGray-500 text-sm">Address</div>
                            <div>
                              {i.address} {i.postcode}
                            </div>
                          </div>
                        </div>
                        <p>
                          <div className="text-meepGray-500 text-sm">
                            What{"'"}s this about?
                          </div>
                          {i.description}
                        </p>
                        {i.publicUrl && (
                          <a
                            href={i.publicUrl}
                            target="_blank"
                            className="bg-green-200 text-green-900 px-3 py-2 text-center w-full rounded-md flex flex-row items-center justify-center gap-2"
                          >
                            <Ticket /> More info &amp; register
                          </a>
                        )}
                      </article>
                    ))}
                </section>
                <div className="w-full border-b border-meepGray-200 my-6"></div>
                <div className="flex flex-col gap-2 text-jungle-green-neutral ">
                  <HustingsCTA />
                </div>
              </div>
            ) : (
              <>
                <div className='p-6 pb-0'>
                  <p>
                    No upcoming events in {data?.name}.
                  </p>
                  <div className="flex flex-col gap-2 text-jungle-green-neutral mt-4">
                    <HustingsCTA />
                  </div>
                </div>
                <div className="w-full border-b border-meepGray-200 my-6"></div>
                <div className="flex flex-col gap-2 text-jungle-green-neutral pt-0 p-6">
                    <h3 className='font-bold'>Other ways to get involved</h3>
                    <p>There are lots of easy ways you can show your candidates you care about people, climate and nature. Take a look at this page here to find out more.</p>
                    <Link href="/get-involved" className='text-jungle-green-600 font-bold'>Learn more &rarr;</Link>
                </div>
              </>
            )}
          </TabsContent>
          <TabsContent className="mt-0" value="candidates">
            <section className="space-y-4">
              {/* {!!postcode && data?.ppcs.some(person => !!person.email?.data) ? ( */}
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
             {/* ) : (
              <>
              {data?.ppcs
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((person) => (
                  <article
                    key={person.id}
                    className="border-2 border-meepGray-200 rounded-md overflow-hidden p-4 flex flex-col gap-2"
                  >
                    <header>
                      <div className="flex items-center">
                        {person.photo && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={new URL(
                              person.photo.url,
                              process.env.NEXT_PUBLIC_BACKEND_BASE_URL
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
                        className="bg-green-200 text-green-900 px-3 py-2 text-center w-full block rounded-md"
                      >
                        Email Candidate
                      </a>
                    ) : (
                      <span className="bg-meepGray-200 text-green-900 px-3 py-2 text-center w-full block rounded-md">
                        No Email Address Yet
                      </span>
                    )}
                  </article>
                ))}
              </>
             )} */}
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
