import { Router } from 'express';
import { upLoadImage } from '../controllers/upLoadController';

class UpLoadImageRouter {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/getImagen', upLoadImage.generateGetUrl);
        this.router.get('/putImage',upLoadImage.generatePutUrl);
        this.router.get('/getList',upLoadImage.getListBucket)
    }

}

const upLoadImageRouter = new UpLoadImageRouter();
export default upLoadImageRouter.router;