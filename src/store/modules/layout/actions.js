import { OPEN_SIDEBAR, CLOSE_SIDEBAR, TOGGLE_SIDEBAR } from "./constants"
import createAction from "src/utils/createAction"

// Create Actions
const openSidebarAction = createAction(OPEN_SIDEBAR)
const closeSidebarAction = createAction(CLOSE_SIDEBAR)
const toggleSidebarAction = createAction(TOGGLE_SIDEBAR)

// Actions
export const openSidebar = () => openSidebarAction()
export const closeSidebar = () => closeSidebarAction()
export const toggleSidebar = () => toggleSidebarAction()
