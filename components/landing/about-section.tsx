'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function AboutSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">About Us</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We're on a mission to make personal finance management accessible and effortless for everyone. Our platform combines cutting-edge technology with intuitive design to help you make better financial decisions.
            </p>
          </motion.div>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative lg:col-span-5 lg:row-span-2"
          >
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692"
              alt="Team meeting"
              className="aspect-[16/9] w-full rounded-2xl object-cover lg:aspect-auto lg:h-[400px]"
              width={800}
              height={400}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <h3 className="text-2xl font-bold tracking-tight">Our Story</h3>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Founded in 2024, we've grown from a small team of finance enthusiasts to a comprehensive platform serving thousands of users. Our journey began with a simple idea: making financial management more accessible and less intimidating.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <h3 className="text-2xl font-bold tracking-tight">Our Values</h3>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              We believe in transparency, security, and empowerment. Every feature we build is designed to help you understand your finances better and make informed decisions about your money. Your financial well-being is our top priority.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}