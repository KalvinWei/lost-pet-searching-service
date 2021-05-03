import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PetImages from "./PetImages/PetImages";
import fromLatLng from "../../../../utils/geoCoding";
import {CardHeader} from "@material-ui/core";
import {Info, Loyalty, Room} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme)=>({
    root: {
        width: 255,
        height: 355,
    },
    media: {
        height: 140,
    },
    content: {
        flexGrow:1
    },
    cardHeader:{
      ...theme.typography.caption,
        textAlign:'center',
        textTransform:'uppercase'
    }
}));

function PostCard({post}) {
    const classes = useStyles();
    const lastSpot = post.trace[post.trace.length - 1]
    const history = useHistory()

    const [address, setAddress] = useState("")
    useEffect(() => {
        async function getAddress() {
            const addr = await fromLatLng(lastSpot.latitude, lastSpot.longitude)
            setAddress(addr.features[0].place_name)
        }

        getAddress()
    }, [])

    function showDetail() {
        history.push({pathname: `/posts/${post._id}`, state: post})
    }

    const statusColor = post.status === 'Reunited' ? 'grey': (post.status === 'Lost' ? 'coral':'darkgreen')

    return (
        <Card variant='elevation' className={classes.root}>
            <CardHeader
                title={<div className={classes.cardHeader} style={{
                    width:'100%', backgroundColor:statusColor, color:'white'}}>{post.status}</div>}
                style={{padding:0}}
            />
            <CardMedia
                className={classes.media}
                title={post.petName}
            >
                <PetImages urls={post.petImages}/>
            </CardMedia>
            <CardContent className={classes.content}>
                <Grid container>
                    <table>
                        <tbody>
                        <tr><td>Name</td><td>{post.petName}</td></tr>
                        <tr><td>ID</td><td>{post._id}</td></tr>
                        <tr><td></td></tr>
                        </tbody>
                    </table>
                </Grid>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" variant='text' onClick={showDetail}>
                    see details
                </Button>
            </CardActions>
        </Card>
    );
}

export default PostCard;