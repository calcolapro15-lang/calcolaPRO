from typing import List

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class PlatformPreset(BaseModel):
    id: str
    label: str
    percentage: float
    fixed: float
    description: str


class TaxRegime(BaseModel):
    id: str
    label: str
    rate: float
    description: str


class Presets(BaseModel):
    platforms: List[PlatformPreset]
    tax_regimes: List[TaxRegime]


PRESETS = Presets(
    platforms=[
        PlatformPreset(id="vinted", label="Vinted", percentage=0, fixed=0,
                       description="0% commissione venditore (a carico dell'acquirente)"),
        PlatformPreset(id="ebay", label="eBay", percentage=11, fixed=0.35,
                       description="11% + 0,35 € per transazione"),
        PlatformPreset(id="shopify", label="Shopify / Stripe", percentage=2.9, fixed=0.30,
                       description="2,9% + 0,30 € commissione di pagamento standard"),
        PlatformPreset(id="amazon", label="Amazon", percentage=15, fixed=0,
                       description="15% tariffa di vendita media"),
        PlatformPreset(id="custom", label="Personalizzato", percentage=5, fixed=0,
                       description="Imposta percentuale e quota fissa su misura"),
    ],
    tax_regimes=[
        TaxRegime(id="none", label="Nessuna tassa", rate=0,
                  description="Vendita occasionale di beni personali usati"),
        TaxRegime(id="forfettario", label="Forfettario", rate=15,
                  description="Stima ~15% sull'utile"),
        TaxRegime(id="ordinario", label="Ordinario", rate=24,
                  description="Stima ~24% sull'utile"),
    ],
)


@router.get("/presets", response_model=Presets)
async def get_presets():
    return PRESETS
