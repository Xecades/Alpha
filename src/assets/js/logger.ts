const logger = {
    plus: (m: String) => console.debug(`[+] ${m}`),
    star: (m: String) => console.debug(`[*] ${m}`),
    nbsp: (m: String) => console.debug(`     ${m}`),
};

export default logger;
