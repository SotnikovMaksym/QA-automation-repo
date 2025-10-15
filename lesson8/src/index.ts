import { ApiObjectDto, UserBriefSummary } from './models';
import util from 'util';

util.inspect.defaultOptions.depth = null;

async function getApiObjectsData(): Promise <ApiObjectDto[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const json = await response.json();
    return json as ApiObjectDto[];
}

function transformUsersToBriefs(users: ApiObjectDto[]): UserBriefSummary[] {
    return users.map(u => new UserBriefSummary(u));
}

(async () => {
    const apiObjects = await getApiObjectsData();
    const firstFive = apiObjects.filter((apiObject) => apiObject.id <= 5);
    const briefSummary = transformUsersToBriefs(firstFive);
    console.log(briefSummary);
})();
