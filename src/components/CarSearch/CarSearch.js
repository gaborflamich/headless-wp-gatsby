import React from "react";
import { useQuery, gql } from "@apollo/client";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { CallToActionButton } from "../CallToActionButton";
import { PageNumber } from "./PageNumber";

export const CarSearch = ({ style, className }) => {
  const pageSize = 3;
  let page = 1;

  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    page = parseInt(params.get("page") || "1");
  }

  const { data, loading, error } = useQuery(
    gql`
      query CarQuery($size: Int!, $offset: Int!) {
        allCar(where: { offsetPagination: { size: $size, offset: $offset } }) {
          nodes {
            databaseId
            title
            uri
            featuredImage {
              node {
                sourceUrl(size: LARGE)
              }
            }
            carDetails {
              price
            }
          }
          pageInfo {
            offsetPagination {
              total
            }
          }
        }
      }
    `,
    {
      variables: {
        size: pageSize,
        offset: pageSize * (page - 1),
      },
    }
  );

  const totalResults = data?.allCar?.pageInfo?.offsetPagination?.total || 0;
  const totalPages = Math.ceil(totalResults / pageSize);

  console.log("DATA: ", data, loading, error);

  return (
    <div style={style} className={className}>
      {!loading && !!data?.allCar?.nodes?.length && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.allCar.nodes.map((car) => (
            <div
              className="flex flex-col rounded-lg border border-stone-200 bg-gray-50 p-2 shadow-inner"
              key={car.databaseId}
            >
              {!!car.featuredImage.node.sourceUrl && (
                <img
                  src={car.featuredImage.node.sourceUrl}
                  alt=""
                  className="aspect-video w-full rounded-md object-cover"
                />
              )}
              <div className="my-2 justify-between gap-2 font-heading text-xl font-bold xl:flex">
                <div className="my-2">{car.title}</div>
                <div className="inline-block whitespace-nowrap rounded-md bg-emerald-900 p-2 text-white">
                  <FontAwesomeIcon icon={faTag} className="mr-2" />
                  <span className="mr-2">
                    {numeral(car.carDetails.price).format("0,0")}
                  </span>
                  <span>€</span>
                </div>
              </div>
              <CallToActionButton
                fullWidth
                label="Read more details"
                destination={car.uri}
              />
            </div>
          ))}
        </div>
      )}
      {!!totalResults && (
        <div className="my-4 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            return <PageNumber key={i} pageNumber={i + 1} />;
          })}
        </div>
      )}
    </div>
  );
};
