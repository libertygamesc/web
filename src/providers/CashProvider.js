import { ROOT } from 'navigation/CONSTANTS';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCash } from 'services/cashService';

const cashContext = createContext();

export function CashProvider({ children }) {

    const [cash, setCash] = useState(null);
    const [cashBonus, setCashBonus] = useState(null);
    const [spin, setSpin] = useState(0);
    const [shard, setShard] = useState(0);
    const [infinite, setInfinite] = useState(0);

    const updateCash = () => {
        getCash()
            .then((res) => {
                setCash(res.cash);
                setCashBonus(res.cashBonus);
                setSpin(res.spin);
                setInfinite(res.infinite == null ? 0 : res.infinite)
                setShard(res.shard == null ? 0 : res.shard);
            })
            .catch((err) => {
                setCash(null)
            });
    }

    return (
        <cashContext.Provider value={{ spin, cash, cashBonus, shard, infinite, updateCash }}>
            {children}
        </cashContext.Provider>
    );
}

export function useCash() {
    return useContext(cashContext);
}
