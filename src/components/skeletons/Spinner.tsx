import React from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        className,
      )}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        }}
        className="flex h-16 w-16 items-center justify-center"
      >
        <Loader className="h-16 w-16 text-blue-500" />
      </motion.div>
    </div>
  );
};

export default Spinner;
