import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(''),
    };
  });

  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center space-x-2 mb-6">
      <motion.div
        className="overflow-hidden"
        initial={{
          width: '0%',
        }}
        whileInView={{
          width: 'fit-content',
        }}
        transition={{
          duration: 2.5,
          ease: 'linear',
          delay: 0.5,
        }}
      >
        <h1
          className={cn('font-black', className)}
          style={{
            whiteSpace: 'nowrap',
          }}
        >
          {renderWords()}
        </h1>
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className={cn(
          'block rounded-sm w-[4px] h-12 md:h-16 lg:h-20 bg-[#8e7951]',
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
