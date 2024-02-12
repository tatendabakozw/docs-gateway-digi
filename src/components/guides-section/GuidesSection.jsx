import Link from "@docusaurus/Link";
import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import "./index.module.css";

function GuidesSection() {
  return (
    <div className="guides-setion-container">
      <GuidesItem
        heading="Authentication"
        description="Learn how to authenticate your API requests."
      />
      <GuidesItem
        heading="Pagination"
        description="Understand how to work with paginated responses."
      />
      <GuidesItem
        heading="Errors"
        description="Read about the different types of errors returned by the API."
      />
      <GuidesItem
        heading="Webhooks"
        description="Learn how to programmatically configure webhooks for your app."
      />
    </div>
  );
}

const GuidesItem = ({ heading, description }) => {
  return (
    <div
      className="grid-item"
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <h5>{heading}</h5>
      <p>{description}</p>
      <Link href={location}>
        <p>Read more</p>
        <ArrowRightIcon height={16} width={16} />
      </Link>
    </div>
  );
};

export default GuidesSection;
