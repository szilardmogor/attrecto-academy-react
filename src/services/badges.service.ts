import request, { Methods } from './../util/request';
import { BadgeModel } from '../models/badges.model';

class BadgesService {
    async getBadges() {
        return request<BadgeModel[]>({ method: Methods.GET, resource: 'badges' });
    }
}

export const badgesService = new BadgesService();