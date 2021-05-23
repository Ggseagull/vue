import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message, Container, Header, Aside, Main, Submenu, MenuItem, Menu, MenuItemGroup,
  Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, Pagination, Dialog, Tag, Select, Option, MessageBox,
  Tree, Footer, Tabs, TabPane, Carousel, CarouselItem, Notification, Upload, Link, Divider
} from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tree)
Vue.use(Footer)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Upload)
Vue.use(Link)
Vue.use(Divider)
Vue.prototype.$msg = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
Vue.use(VueQuillEditor)
