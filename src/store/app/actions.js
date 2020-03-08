export function setPrayers(context, prayers) {
    context.commit('SET_PRAYERS', prayers)
}
export function addPrayer(context, prayer) {
    context.commit('ADD_PRAYER', prayer)
}