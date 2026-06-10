export const StringConvert = (stringBox,classs) => {
    const markup = { __html: stringBox }
     return <div className={`${classs && classs}`} dangerouslySetInnerHTML={ markup } />;
   };