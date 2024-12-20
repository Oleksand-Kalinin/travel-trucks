import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { fetchTruckById } from "../../js/fetchTruckById.js";
import Section from "../Section/Section.jsx";
import Container from "../Container/Container.jsx";

import sprite from "../../images/sprite.svg";

import css from "./TruckItem.module.css";
import clsx from "clsx";

const TruckItem = () => {
  const { id } = useParams("id");
  const [truck, setTruck] = useState(null);

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.activeLink);
  };

  useEffect(() => {
    const fetchTruck = async () => {
      const res = await fetchTruckById(id);
      setTruck(res);
    };
    fetchTruck();
  }, [id]);

  console.log(truck);

  return (
    <Section>
      <Container>
        {truck && (
          <>
            <h3 className={css.truckTitle}>{truck.name}</h3>

            <div className={css.truckRatingLocation}>
              <div className={css.truckRating}>
                <svg className={css.starIcon}>
                  <use href={`${sprite}#star-icon`}></use>
                </svg>
                <p>
                  {truck.rating}({truck.reviews.length} Reviews)
                </p>
              </div>

              <div className={css.truckLocation}>
                <svg className={css.mapIcon}>
                  <use href={`${sprite}#map-icon`}></use>
                </svg>
                <p>{truck.location}</p>
              </div>
            </div>

            <p className={css.truckPrice}>&#8364;{truck.price}.00</p>

            <div className={css.truckGallery}>
              {truck.gallery.map((item, index) => (
                <img
                  className={css.image}
                  key={index}
                  src={item.thumb}
                  alt={truck.name}
                />
              ))}
            </div>

            <p className={css.truckDescription}>{truck.description}</p>

            <div className={css.truckTabs}>
              <NavLink className={buildLinkClass} to="features">
                Features
              </NavLink>
              <NavLink className={buildLinkClass} to="reviews">
                Reviews
              </NavLink>
            </div>

            <Outlet />
          </>
        )}
      </Container>
    </Section>
  );
};

export default TruckItem;
