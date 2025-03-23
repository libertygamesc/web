import { useCash } from "providers/CashProvider";
import { useLayout } from "providers/LayoutProvider";
import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { getSpin } from "services/cashService";

const Roulette = ({ data }) => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [rouletteData, setRouletteData] = useState(data);
    const { spin, updateCash } = useCash();
    const { showSuccessDialog, closeSuccessDialog, setLoading, showErrorDialog, closeErrorDialog, showAlertDialog, closeAlertDialog, getStringLanguage} = useLayout();


    const handleSpinClick = () => {
        if (!mustSpin) {
            if (spin == null || spin <= 0) {
                showErrorDialog(getStringLanguage("Você não possui tickets para girar a roleta"), () => {
                    closeErrorDialog();
                })
            } else {
                setLoading(true);
                getSpin()
                    .then((res) => {
                        setLoading(false)
                        const newPrizeNumber = parseInt(res.status);
                        setPrizeNumber(newPrizeNumber);
                        setMustSpin(true);
                        setTimeout(s => {
                            updateCash();
                            showSuccessDialog(res.message, () => {
                                closeSuccessDialog();
                            })
                        }, 3000)
                    })
                    .catch((err) => {

                    });
            }
        }
    };

    useEffect(() => {
        const addShortString = data.map((item) => {
            return {
                completeOption: item.text,
                option:
                    item.text.length >= 30
                        ? item.text.substring(0, 30).trimEnd() + "..."
                        : item.text
            };
        });
        setRouletteData(addShortString);
    }, [data]);

    return (
        <>
            <div align="center" className="roulette-container">
                <Wheel
                    mustStartSpinning={mustSpin}
                    spinDuration={[0.2]}
                    prizeNumber={prizeNumber}
                    data={rouletteData}
                    outerBorderColor={["#ccc"]}
                    outerBorderWidth={[9]}
                    innerBorderColor={["#f2f2f2"]}
                    radiusLineColor={["tranparent"]}
                    radiusLineWidth={[1]}
                    textColors={["#f5f5f5"]}
                    textDistance={55}
                    fontSize={[10]}
                    backgroundColors={[
                        "#3f297e",
                        "#175fa9",
                        "#169ed8",
                        "#239b63",
                        "#64b031",
                        "#efe61f",
                        "#f7a416",
                        "#e6471d",
                        "#dc0936",
                        "#e5177b",
                        "#be1180",
                        "#871f7f"
                    ]}
                    onStopSpinning={() => {
                        setMustSpin(false);
                    }}
                />
                <button className="button roulette-button" onClick={handleSpinClick}>
                    Girar
                </button>
            </div>
            <br />
        </>
    );
};

export default Roulette;
