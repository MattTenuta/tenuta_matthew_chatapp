export default {
    name: 'TheTypingMessageComponent',

    props: ['type'],

    data() {
        return {
            // check to see if the message's socket id is the same as ours
            // if it is, float to the right
            // else float to the left
            matchedID: this.$parent.socketID == this.type.id
        }
    },

    template: `
    <article class="chat-messages" :class="{ 'other-messages' : matchedID}">
        <h2>{{ type.typing.user }} Yooo </h2>
    </article>
    `

}