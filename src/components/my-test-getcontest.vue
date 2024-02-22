<template>
    <div>
        <p>GetUser</p>
        <div>
            <ul>
               第{{cur_page}}页
                <li v-for="contest in contests" :key="contest.ID">
                    {{contest.ID}} {{contest.Name}} - {{contest.Type}}
                </li>
            </ul>
        </div>
        <button @click="prevPage">上一页</button>
        <button @click="nextPage">下一页</button>
    </div>
</template>

<script>
    import request from '../http/axios';
    import { ref } from 'vue';
    //import { onMounted } from 'vue'
    export default {
        data() {
            return {
                contests: [],
                cur_page: ref(1),
                total: 0,
                total_page: 0

            };
        },
        created() {
            this.getData();

        },
        methods: {
            getData() {
                request.get('/cms/get_contest', {
                    params: {
                        page_size: 3,
                        page_number: this.cur_page
                    }
                })
                     .then(response => {
                         this.contests = response.data.list;
                         this.total = response.data.total;
                         this.total_page = response.data.total_page;
                         return response;
                     })
                     .then(response => console.log(response.data))
                    .catch(error => console.error(error));
            },
            nextPage() {
                if(this.cur_page >= this.total_page) {
                    return;
                }
                request.get('/cms/get_contest', {
                    params: {
                        page_size: 3,
                        page_number: this.cur_page + 1
                    }
                })
                    .then(response => {
                        this.contests = response.data.list;
                        this.total = response.data.total;
                        this.total_page = response.data.total_page;
                        this.cur_page = response.data.page_number;
                        return response;
                    })
                    .then(response => console.log(response))
                    .catch(error => console.error(error));
            },
            prevPage() {
                if(this.cur_page <= 1) {
                    return
                }
                request.get('/cms/get_contest', {
                    params: {
                        page_size: 3,
                        page_number: this.cur_page - 1
                    }
                })
                    .then(response => {
                        this.contests = response.data.list;
                        this.total = response.data.total;
                        this.total_page = response.data.total_page;
                        this.cur_page = response.data.page_number;
                        return response;
                    })
                    .then(response => console.log(response))
                    .catch(error => console.error(error));
            }
        }
    };
</script>

<style scoped lang="scss">

</style>