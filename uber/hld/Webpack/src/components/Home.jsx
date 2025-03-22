// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import * as styles from "./Home.module.css";
import Autocomplete from "../reusableComponents/autocomplete";
import Button from "sumit-component-library/Button";
import Text from "sumit-component-library/Text";

const Home = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to Bangalore</h1>
        <p>The Silicon Valley of India</p>
      </header>
      <section className={styles.content}>
        <h2>History of Bangalore</h2>
        <p>
          Bangalore, officially Bengaluru, is the capital of Karnataka. Known as
          the **Garden City**, it has transformed into the **IT Hub of India**.
        </p>
        <h2>Silicon Valley of India</h2>
        <p>
          Home to major tech giants like Infosys, Wipro, and many startups,
          Bangalore is the heart of India's IT revolution.
        </p>
        <h2>Enter Email Address</h2>
        <Autocomplete />
      </section>

      <Link to="/about" className={styles.button}>
        Explore Bangalore
      </Link>
      <Button variant="primary" label="primary"></Button>
      <Button size="md" variant="secondary" label="secondary"></Button>
      <Text content="Sumit text"></Text>
    </div>
  );
};

export default Home;
