
const { SOCKETIO_RESULT_SUFFIX } = env_;
export function getResultEvent(event) {
    return `${event}:${SOCKETIO_RESULT_SUFFIX}`;
}